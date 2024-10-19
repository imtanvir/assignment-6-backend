import { Types } from 'mongoose';
import { TPost, TVotes } from './post.interface';
import { PostModel } from './post.model';

const createPost = async (payload: TPost) => {
  const post = await PostModel.create(payload);
  return post;
};

const getAllPost = async () => {
  const posts = await PostModel.find({})
    .populate({ path: 'user', select: '_id name image email' })
    .populate({
      path: 'comments.author',
      select: '_id name image',
    });

  return posts;
};

const updatePostVote = async (postId: string, userId: string, action: 'upvote' | 'downvote') => {
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  // Initialize the updateData object
  let updateData: any = {
    votes: post.votes || [], // Ensure votes is initialized
    upvote: post.upvote,
    downvote: post.downvote,
  };

  // Find the existing vote by the user
  const existingVote = updateData.votes.find(
    (vote: TVotes) => vote.userId.toString() === userId.toString(),
  );

  if (action === 'upvote') {
    if (existingVote) {
      if (existingVote.voteType === 'downvote') {
        // User is switching from downvote to upvote
        updateData.upvote += 1; // Increase upvotes
        updateData.downvote -= 1; // Decrease downvotes
        existingVote.voteType = 'upvote'; // Change vote type
      }
      // If the user is already upvoting, do nothing
    } else {
      // If the user has not voted yet, add a new upvote
      updateData.upvote += 1;
      updateData.votes.push({ userId: new Types.ObjectId(userId), voteType: 'upvote' });
    }
  } else if (action === 'downvote') {
    if (existingVote) {
      if (existingVote.voteType === 'upvote') {
        // User is switching from upvote to downvote
        updateData.downvote += 1; // Increase downvotes
        updateData.upvote -= 1; // Decrease upvotes
        existingVote.voteType = 'downvote'; // Change vote type
      }
      // If the user is already downvoting, do nothing
    } else {
      // If the user has not voted yet, add a new downvote
      updateData.downvote += 1;
      updateData.votes.push({ userId: new Types.ObjectId(userId), voteType: 'downvote' });
    }
  }

  // Use findByIdAndUpdate to update the post in the database
  const result = await PostModel.findByIdAndUpdate(
    postId,
    {
      upvote: updateData.upvote,
      downvote: updateData.downvote,
      votes: updateData.votes,
    },
    { new: true }, // Return the updated document
  );

  return result; // Return the updated post
};
export const PostService = {
  createPost,
  getAllPost,
  updatePostVote,
};

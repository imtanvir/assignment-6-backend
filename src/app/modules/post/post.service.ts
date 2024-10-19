import { TPost } from './post.interface';
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
export const PostService = {
  createPost,
  getAllPost,
};

import { TPost } from './post.interface';
import { PostModel } from './post.model';

const createPost = async (payload: TPost) => {
  const post = await PostModel.create(payload);
  return post;
};

const getAllPost = async () => {
  const post = await PostModel.find({})
    .populate('user')
    .populate({
      path: 'comment',
      populate: {
        path: 'author',
      },
    });
  return post;
};
export const PostService = {
  createPost,
  getAllPost,
};

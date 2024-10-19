import { TPost } from './post.interface';
import { PostModel } from './post.model';

const createPost = async (payload: TPost) => {
  const post = await PostModel.create(payload);
  return post;
};

export const PostService = {
  createPost,
};

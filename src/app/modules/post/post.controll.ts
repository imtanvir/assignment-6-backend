import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostService } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await PostService.createPost(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post created successfully!',
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await PostService.getAllPost();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All post retrieved successfully!',
    data: result,
  });
});

const updatePostVote = catchAsync(async (req, res) => {
  const payload = req.body;
  const { postId, userId, action } = payload;
  const result = await PostService.updatePostVote(postId, userId, action);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post updated successfully!',
    data: result,
  });
});
export const PostController = {
  createPost,
  getAllPost,
  updatePostVote,
};

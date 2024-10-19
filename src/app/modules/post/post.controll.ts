import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostService } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const payload = req.body;
  console.log({ payload });
  const result = await PostService.createPost(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post created successfully!',
    data: result,
  });
});

export const PostController = {
  createPost,
};

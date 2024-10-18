import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const SignUp = catchAsync(async (req, res) => {
  const payload = req.body;
  if (!req.files) {
    throw new Error('User Photo not provided!');
  }
  const result = await authService.SignUp(payload, req.files as Express.Multer.File[]);
  const authUserResponse = { ...result.toObject(), password: undefined };
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully!',
    data: authUserResponse,
  });
});
export const AuthController = {
  SignUp,
};

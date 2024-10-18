import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const userProfile = catchAsync(async (req, res) => {
  const result = await UserService.userProfile(req.user._id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile fetched successfully!',
    data: result,
  });
});

export const UserController = {
  userProfile,
};

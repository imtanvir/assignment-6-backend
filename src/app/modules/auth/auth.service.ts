import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../middleware/AppError';
import { sendImageToCloudinary } from '../../utils/uploadImageInCloudinary';
import { TImage } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { TAuth } from './auth.interface';

const SignUp = async (payload: TAuth, files: Express.Multer.File[]) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isUserExist = await UserModel.isUserExist(payload.email);
    if (isUserExist) {
      throw new AppError(httpStatus.CONFLICT, 'User already Exist!');
    }

    if (files) {
      const images: TImage[] = [];
      for (const file of files) {
        const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;

        // send image to Cloudinary using buffer
        const { secure_url } = await sendImageToCloudinary(imageName, file.buffer);
        images.push({
          id: imageName,
          url: secure_url as string,
          isRemove: false,
        });
      }
      payload.image = images;
    }
    const result = await UserModel.create(payload);

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
};
export const authService = {
  SignUp,
};

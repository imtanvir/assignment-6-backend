import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../middleware/AppError';
import {
  deleteImageFromCloudinary,
  sendImageToCloudinary,
} from '../../utils/uploadImageInCloudinary';
import { USER_ROLE } from './user.constant';
import { TImage, TUser } from './user.interface';
import { UserModel } from './user.model';

const userProfile = async (_id: string) => {
  const result = await UserModel.findById({ _id });
  if (!result) {
    throw new Error('User not found!');
  }

  return result;
};

const userUpdate = async (_id: string, payload: Partial<TUser>, files: any[]) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const images: TImage[] = [];

    const isUserExist = await UserModel.findById({ _id });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not exist!');
    }
    if (
      isUserExist?.image &&
      payload?.image &&
      payload.image !== undefined &&
      isUserExist?.image?.[0].isRemove !== payload?.image?.[0].isRemove
    ) {
      for (const img of payload.image) {
        await deleteImageFromCloudinary(img.id);
      }
    }

    if (files.length > 0) {
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

      payload.image = [...images];
    }

    const result = await UserModel.findByIdAndUpdate({ _id }, payload, {
      new: true,
      runValidators: true,
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllUser = async () => {
  const result = await UserModel.find({ role: { $ne: USER_ROLE.superAdmin } }).select('-password');
  return result;
};

const updateUserByAdmin = async (_id: string, payload: Partial<TUser>, files: any[]) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const images: TImage[] = [];

    const isUserExist = await UserModel.findById({ _id });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not exist!');
    }
    if (
      isUserExist?.image &&
      payload?.image &&
      payload.image !== undefined &&
      isUserExist?.image?.[0].isRemove !== payload?.image?.[0].isRemove
    ) {
      for (const img of payload.image) {
        await deleteImageFromCloudinary(img.id);
      }
    }

    if (files.length > 0) {
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

      payload.image = [...images];
    }

    const result = await UserModel.findByIdAndUpdate({ _id }, payload, {
      new: true,
      runValidators: true,
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserService = {
  userProfile,
  userUpdate,
  getAllUser,
  updateUserByAdmin,
};

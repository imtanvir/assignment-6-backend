import { UserModel } from './user.model';

const userProfile = async (_id: string) => {
  const result = await UserModel.findById({ _id });
  if (!result) {
    throw new Error('User not found!');
  }

  return result;
};

export const UserService = {
  userProfile,
};

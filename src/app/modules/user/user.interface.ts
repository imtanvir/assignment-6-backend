import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TRole = 'user' | 'admin' | 'superAdmin';
export type TImage = {
  id: string;
  url: string;
  isRemove: boolean;
};
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TRole;
  premium: boolean;
  phone: string;
  address: string;
  followers: number;
  following: number;
  image: TImage[];
};

export type TUserRole = keyof typeof USER_ROLE;

export interface ExtendModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPasswordMatched(plainPassword: string, hashPassword: string): Promise<boolean>;
}

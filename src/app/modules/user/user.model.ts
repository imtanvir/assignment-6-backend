import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { ExtendModel, TUser } from './user.interface';

const userSchema = new Schema<TUser, ExtendModel>();

// Hash the password to secure
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.dcrypt_salt_round));
  next();
});

// Not sending password field in document
userSchema.post('save', function (doc, next) {
  // set empty value for password and it will not send value in client
  doc.password = '';
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const UserModel = model<TUser, ExtendModel>('user', userSchema);

import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { UserModel } from '../modules/user/user.model';

const superUser = {
  name: 'Tanvir',
  email: 'tanvirparvej101@gmail.com',
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
  premium: true,
  phone: '01700000000',
  address: 'Dhaka',
  followers: 0,
  following: 0,
  image: [
    {
      id: null,
      url: null,
      isRemove: false,
    },
  ],
};

const superAdmin = async () => {
  const isSuperAdminExits = await UserModel.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExits) {
    await UserModel.create(superUser);
    console.log('Super Admin created');
  }
};

export default superAdmin;

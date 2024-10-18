import express from 'express';
import authCheck from '../../middleware/authCheck';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controll';
const router = express.Router();

router.get(
  '/',
  authCheck(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  UserController.userProfile,
);

export const UserRoute = router;

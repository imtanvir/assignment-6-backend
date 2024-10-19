import express from 'express';
import authCheck from '../../middleware/authCheck';
import requestValidation from '../../middleware/requestValidation';
import { USER_ROLE } from '../user/user.constant';
import { PostController } from './post.controll';
import { postValidation } from './post.validation';

const router = express.Router();
router.post(
  '/create-post',
  authCheck(USER_ROLE.user),
  requestValidation(postValidation.postCheck),
  PostController.createPost,
);

router.get(
  '/all-post',
  authCheck(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin),
  PostController.getAllPost,
);

router.put('/update-post/vote', authCheck(USER_ROLE.user), PostController.updatePostVote);

export const PostRoute = router;

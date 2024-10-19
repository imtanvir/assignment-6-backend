import express, { NextFunction, Request, Response } from 'express';
import authCheck from '../../middleware/authCheck';
import requestValidation from '../../middleware/requestValidation';
import { upload } from '../../utils/uploadImageInCloudinary';
import { USER_ROLE } from '../user/user.constant';
import { PostController } from './post.controll';
import { postValidation } from './post.validation';

const router = express.Router();
router.post(
  '/create-post',
  authCheck(USER_ROLE.user),
  upload.array('file', 1),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  requestValidation(postValidation.postCheck),
  PostController.createPost,
);

router.get(
  '/all-post',
  authCheck(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin),
  PostController.getAllPost,
);

router.put('/update-post/vote', authCheck(USER_ROLE.user), PostController.updatePostVote);

router.put(
  '/update-post/:id',
  authCheck(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.array('file', 1),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  PostController.updatePost,
);

export const PostRoute = router;

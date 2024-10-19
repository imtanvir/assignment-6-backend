import express from 'express';
import { AuthRoute } from '../app/modules/auth/auth.route';
import { PostRoute } from '../app/modules/post/post.route';
import { UserRoute } from '../app/modules/user/user.route';
const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/post',
    route: PostRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export const Router = router;

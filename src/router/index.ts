import express from 'express';
import { AuthRoute } from '../app/modules/auth/auth.route';
const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export const Router = router;

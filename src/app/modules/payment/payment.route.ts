import express from 'express';
import authCheck from '../../middleware/authCheck';
import { USER_ROLE } from '../user/user.constant';
import { PaymentController } from './payment.controll';

const router = express.Router();

router.get(
  '/create-payment-history',
  authCheck(USER_ROLE.user),
  PaymentController.PaymentHistoryCreate,
);

export const PaymentHistoryRoute = router;

import express from 'express';
import authCheck from '../../middleware/authCheck';
import { USER_ROLE } from '../user/user.constant';
import { PaymentController } from './payment.controll';

const router = express.Router();

router.post(
  '/create-payment-history',
  authCheck(USER_ROLE.user),
  PaymentController.PaymentHistoryCreate,
);

router.post('/advance-payment', authCheck(USER_ROLE.user), PaymentController.advancePayment);
router.get('/all-payment-history', authCheck(USER_ROLE.user), PaymentController.getPaymentHistory);

export const PaymentHistoryRoute = router;

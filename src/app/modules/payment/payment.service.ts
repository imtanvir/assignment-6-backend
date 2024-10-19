import { TPayment } from './payment.interface';
import { PaymentModel } from './payment.model';

const createPaymentHistory = async (payload: TPayment) => {
  const result = await PaymentModel.create(payload);
  return result;
};

export const PaymentService = { createPaymentHistory };

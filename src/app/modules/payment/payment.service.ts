import { stripe } from '../../../app';
import { TPayment } from './payment.interface';
import { PaymentModel } from './payment.model';

const createPaymentHistory = async (payload: TPayment) => {
  const result = await PaymentModel.create(payload);
  return result;
};

const advancePayment = async (amount: number) => {
  const amountConvert = amount * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountConvert,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  const result = {
    clientSecret: paymentIntent.client_secret,
  };

  return result;
};

const getPaymentHistory = async () => {
  const result = await PaymentModel.find({}).sort({ createdAt: -1 });
  return result;
};
export const PaymentService = { createPaymentHistory, advancePayment, getPaymentHistory };

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';

const PaymentHistoryCreate = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await PaymentService.createPaymentHistory(payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment history created successfully!',
    data: result,
  });
});

const advancePayment = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const result = await PaymentService.advancePayment(amount);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Advance payment successfully',
    data: result,
  });
});

const getPaymentHistory = catchAsync(async (req, res) => {
  const result = await PaymentService.getPaymentHistory();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment history fetched successfully!',
    data: result,
  });
});

export const PaymentController = {
  PaymentHistoryCreate,
  advancePayment,
  getPaymentHistory,
};

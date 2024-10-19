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

export const PaymentController = {
  PaymentHistoryCreate,
};

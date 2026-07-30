import { Router, Request, Response } from "express";
import { CREATE_PAYMENT_ENDPOINT, VERIFY_PAYMENT_ENDPOINT } from "../utils/exportedVariables";
import { paymentController } from "../app";

const PaymentRoutes = Router();

PaymentRoutes.post(CREATE_PAYMENT_ENDPOINT, (req: Request, res: Response) => {
    paymentController.createPayment(req, res);
});

PaymentRoutes.post(VERIFY_PAYMENT_ENDPOINT, (req: Request, res: Response) => {
    paymentController.verifyPayment(req, res);
});

export default PaymentRoutes;
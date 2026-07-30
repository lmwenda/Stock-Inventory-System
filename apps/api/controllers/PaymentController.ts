import { Request, Response } from "express";
import PaymentServices from "../services/PaymentServices";
import { Transaction } from "../utils/exportedInterfaces";

class PaymentController {
    constructor(private readonly PaymentServices: PaymentServices){}

    public async createPayment(req: Request, res: Response)
    {
        const body = {
            token: req.body.token,
            amount: req.body.amount
        }

        const paymentIntent = await this.PaymentServices.CreatePayment(body.token, body.amount);

        if (paymentIntent == null){
            res.status(500).json({
                type: "Failure",
                message: "Payment creation failed"
            });
        }

        res.status(200).json({
            type: "Success",
            payload: {
                clientSecret: paymentIntent?.client_secret
            }
        })
    }

    public async verifyPayment(req: Request, res: Response)
    {
        const body: { token: string, pi_client_secret: string} = {
            token: req.body.token,
            pi_client_secret: req.body.pi_client_secret
        }

        const verifiedPayment = await this.PaymentServices.VerifyPayment(body.token, body.pi_client_secret);

        if(verifiedPayment == null)
        {
            return res.status(400).json({ type: "Failure", message: "Not Authorised to Make this Payment" })
        }

        else if(verifiedPayment.status === "succeeded")
        {
            const order: Transaction =  {
                TransactionID: verifiedPayment.id,
                UserID: 0,
                Amount: verifiedPayment.amount,
                Currency: verifiedPayment.currency,
                status: verifiedPayment.status
            }
            const transaction = await this.PaymentServices.CreateOrder(order);

            res.status(200).json({
                type: "Success",
                payload: {
                    transaction
                }
            })
        }
    }
}

export default PaymentController;
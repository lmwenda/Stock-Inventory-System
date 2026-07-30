import * as jwt from "jsonwebtoken";
import stripe from "../utils/stripe";
import Stripe from "stripe";
import { ResultSetHeader } from "mysql2";
import { Transaction, UserJWTPayload } from "../utils/exportedInterfaces";
import PaymentRepository from "../repositories/PaymentRepository";

class PaymentServices {
    private secretT: string;
    private userID: number;

    constructor(private readonly paymentRepository: PaymentRepository)
    {
        this.secretT = process.env.JWT_TOKEN as string;
        this.userID = 0;
    }

    public async CreatePayment(token: string, price: number): Promise<Stripe.PaymentIntent | null>
    {
        const isVerified = jwt.verify(token, this.secretT) as UserJWTPayload;

        if(!isVerified) return null;
        
        try
        {
            console.log("before...");
            const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
                amount: price*100,
                currency: "gbp",
                automatic_payment_methods: {
                    enabled: true
                }
            });
            console.log("after...");

            return paymentIntent;
        }
        catch(err)
        {
            console.error(err);

            return null;
        }
            
    }

    public async VerifyPayment(token: string, pi_client_secret: string): Promise<Stripe.PaymentIntent | null>
    {
        const isVerified = jwt.verify(token, this.secretT) as UserJWTPayload;
        this.userID = isVerified.id;
        if(!isVerified) return null;

        const verifiedPayment: Stripe.PaymentIntent = await stripe.paymentIntents.retrieve(pi_client_secret);
        return verifiedPayment;
    }

    public async CreateOrder(body: Transaction): Promise<ResultSetHeader>
    {
        body.UserID = this.userID;
        const SavedTransaction = this.paymentRepository.CreateTransaction(body);
        return SavedTransaction;
    }

}

export default PaymentServices;
"use client";

import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import { useState } from "react";


export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    async function submitPayment(
        e: any
    ) {

        e.preventDefault();


        if (!stripe || !elements) {
            return;
        }


        setLoading(true);


        const result = await stripe.confirmPayment({

            elements,

            confirmParams: {
                return_url:
                    "http://localhost:3000/success"
            }

        });


        if (result.error) {

            setMessage(
                result.error.message ?? "Payment failed"
            );

        }


        setLoading(false);
    }



    return (

        <form
            onSubmit={submitPayment}
            className="space-y-6"
        >

            <div className="rounded-lg bg-zinc-800 p-5">

                <PaymentElement />

            </div>


            {message && (

                <p className="rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-400">
                    {message}
                </p>

            )}


            <button
                disabled={!stripe || loading}
                className="w-full rounded-lg bg-orange-500 py-3 text-lg font-bold text-black transition hover:bg-orange-400 disabled:opacity-50"
            >

                {
                    loading
                        ? "Processing..."
                        : "Pay Now"
                }

            </button>


        </form>

    );
}
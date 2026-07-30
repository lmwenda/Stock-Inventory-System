"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
    const searchParams = useSearchParams();

    const paymentIntent = searchParams.get("payment_intent");
    const status = searchParams.get("redirect_status");

    useEffect(() => {
        async function verifyPaymentRequest()
        {
            if(paymentIntent == null) return;
            const body = {
                token: localStorage.getItem("token") as string,
                pi_client_secret: paymentIntent as string
            }

            console.log(body.token);
            console.log(body.pi_client_secret)

            const response = await fetch("http://localhost:5000/api/payments/verify", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.payload.transaction) return window.location.href = "/";
        }

        verifyPaymentRequest();
        
    }, [])

    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-2xl border border-orange-500 bg-zinc-900 shadow-2xl">

                <div className="border-b border-zinc-800 p-8 text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-500">
                        <svg
                            className="h-12 w-12 text-black"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-white">
                        Payment Successful
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        Thank you for your purchase. Your payment has been received
                        and your order is now being processed.
                    </p>
                </div>

                <div className="space-y-5 p-8">

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                        <p className="text-sm uppercase tracking-wider text-zinc-500">
                            Payment Status
                        </p>

                        <p className="mt-2 font-semibold text-green-400">
                            {status ?? "Succeeded"}
                        </p>
                    </div>

                    {paymentIntent && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                            <p className="text-sm uppercase tracking-wider text-zinc-500">
                                Payment ID
                            </p>

                            <p className="mt-2 break-all font-mono text-sm text-orange-400">
                                {paymentIntent}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">

                        <Link
                            href="/"
                            className="flex-1 rounded-lg bg-orange-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-orange-400"
                        >
                            Continue Shopping
                        </Link>

                        <Link
                            href="/orders"
                            className="flex-1 rounded-lg border border-orange-500 px-6 py-3 text-center font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-black"
                        >
                            View Orders
                        </Link>

                    </div>
                </div>
            </div>
        </main>
    );
}
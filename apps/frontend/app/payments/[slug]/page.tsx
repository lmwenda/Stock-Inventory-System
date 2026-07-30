"use client";

import { use, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import CheckoutForm from "@/app/components/CheckoutForm";
import GetProduct from "@/app/components/GetProduct";

export default function Page({params}: { params: Promise<{ slug: string }> }) 
{
    const { slug } = use(params);

    const [ clientSecret, setClientSecret ] = useState<string>("");

    useEffect(() => {
        const token: string | null = localStorage.getItem("token");
        
        async function createPayment() 
        {
            const productData = await GetProduct(slug, token);
            console.log("from data variable: ", productData.Price)

            const response = await fetch(
                "http://localhost:5000/api/payments/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: token,
                        amount: productData.Price 
                    })
                }
            );
    
            const data = await response.json();
    
            console.log(data);
            setClientSecret(data.payload.clientSecret);
        }
        
        createPayment();

    }, []);


    if (!clientSecret) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
                <p className="text-xl text-orange-500">
                    Loading checkout...
                </p>
            </main>
        );
    }

    return(
        <div>
         <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">

            <div className="mx-auto max-w-3xl">

                <h1 className="mb-8 text-center text-4xl font-bold text-orange-500">
                    Checkout
                </h1>


                <div className="rounded-2xl border border-orange-500 bg-zinc-900 p-8 shadow-xl">

                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret
                        }}
                    >
                        <CheckoutForm />
                    </Elements>

                </div>

            </div>

        </main>
        </div>
    );
}
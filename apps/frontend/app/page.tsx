"use client";

import React from "react";
import { redirect } from "next/navigation";
import GetProducts from "./GetProducts";
import Link from "next/link";

type TProduct = {
    ProductID: number,
    SKU: string,
    ProductName: string,
    Description: string,
    Category: string,
    Price: number,
    StockCount: number,
    CreatedAt: string,
    UpdatedAt: string,
    Image: string
}

export default function Home() {
  const [products, setProducts] = React.useState<TProduct[]>([]);

  React.useEffect(() => {
      const token: string | null = localStorage.getItem("token");

      if(!token)
      {
        redirect("/login");
      }

      async function retrieveProducts()
      {
        const data = await GetProducts(token);
        console.log(data);

        setProducts(data.payload.products);
      }

      retrieveProducts();
     
  }, []);

    return (
        <main className="min-h-screen bg-zinc-950 text-white p-8">

            <h1 className="mb-2 text-4xl font-bold text-orange-500">
                Browse Products
            </h1>

            <p className="mb-8 text-zinc-400">
                Browse our latest stock.
            </p>

            <input
                type="text"
                placeholder="Search products..."
                className="mb-8 w-full rounded-lg border border-orange-500 bg-zinc-900 p-3 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((product) => (

                    <div
                        key={product.ProductID}
                        className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg transition hover:scale-105 hover:border-orange-500"
                    >

                        <img
                            src={product.Image}
                            alt={product.ProductName}
                            className="h-48 w-full object-cover"
                        />

                        <div className="space-y-2 p-5">

                            <h2 className="text-xl font-bold">
                                {product.ProductName}
                            </h2>

                            <p className="text-sm text-zinc-400">
                                {product.Category}
                                <br />
                                {product.SKU}
                            </p>

                            <p className="text-2xl font-bold text-orange-500">
                                £{product.Price.toFixed(2)}
                            </p>

                            <p
                                className={
                                    product.StockCount > 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                }
                            >
                                {product.StockCount > 0
                                    ? `${product.StockCount} in stock`
                                    : "Out of stock"}
                            </p>

                            <Link href={`/products/${product.ProductID}`}>
                              <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 font-semibold text-black transition hover:bg-orange-400">
                                  View Product
                              </button>
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </main>
    );

}

'use client';
import Link from 'next/link';
import { use, useEffect, useState } from 'react'
import GetProduct from '@/app/components/GetProduct';
import { redirect } from 'next/navigation';
 
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

export default function BlogPostPage({params}: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [ product, setProduct ] = useState<TProduct>();
 
    useEffect(() => {
        const token: string | null = localStorage.getItem("token");

        if(!token)
        {
            redirect("/login");
        }

        async function retrieveProduct() {
            const _product = await GetProduct(slug, token);

            setProduct(_product)
            console.log(_product);
        }

        retrieveProduct();

    }, [])
 
    return (
        <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                        <img
                            src={product?.Image}
                            alt="Product"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="space-y-6">

                        <span className="rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-black">
                           {product?.Category} 
                        </span>

                        <h1 className="text-5xl font-bold">
                            {product?.ProductName}
                        </h1>

                        <p className="text-4xl font-bold text-orange-500">
                            {product?.Price}
                        </p>

                        <p className="leading-7 text-zinc-300">
                            {product?.Description}
                        </p>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

                            <h2 className="mb-4 text-xl font-bold">
                                Product Details
                            </h2>

                            <div className="space-y-3 text-zinc-300">

                                <div className="flex justify-between">
                                    <span>SKU</span>
                                    <span className="font-semibold text-white">
                                       {product?.SKU}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Created At</span>
                                    <span className="font-semibold text-white">
                                        {product?.CreatedAt}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Category</span>
                                    <span className="font-semibold text-white">
                                        {product?.Category}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Quantity</span>
                                    <span className="font-semibold text-green-400">
                                       {product?.StockCount}
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Quantity
                            </label>

                            <input
                                type="number"
                                defaultValue={1}
                                min={1}
                                className="w-28 rounded-lg border border-orange-500 bg-zinc-900 p-3 text-center outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">

                            <button className="flex-1 rounded-xl bg-orange-500 py-4 text-lg font-bold text-black transition hover:bg-orange-400">
                                Add to Order
                            </button>

                            <button className="rounded-xl border border-orange-500 px-8 font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-black">
                                <Link href="/">
                                    Back
                                </Link>
                            </button>

                        </div>

                    </div>

                </div>

                {/* Description Section */}
                <section className="mx-auto mt-16 max-w-7xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                    <h2 className="mb-6 text-3xl font-bold">
                        Description
                    </h2>

                    <p className="leading-8 text-zinc-300">
                        {product?.Description}
                    </p>

                </section>

            </main>
        );
}
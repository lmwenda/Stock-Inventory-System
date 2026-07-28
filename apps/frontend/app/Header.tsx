"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const logout = (): void => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    useEffect(() => {
        const token: string | null = localStorage.getItem("token");

        if(token)
        {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <nav className="bg-black border-b border-orange-500 shadow-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-orange-500"
                >
                    Stock Inventory
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/"
                        className="text-white transition hover:text-orange-500"
                    >
                        Home
                    </Link>

                    {
                        isLoggedIn ? (
                            <>
                                <Link
                                    href="/orders"
                                    className="text-white transition hover:text-orange-500"
                                >
                                    Orders
                                </Link>
                                
                                <button
                                    onClick={() => logout()}
                                    className="rounded-md bg-orange-500 px-4 py-2 text-center font-medium text-black transition hover:bg-orange-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-md bg-orange-500 px-4 py-2 font-medium text-black transition hover:bg-orange-400"
                                >
                                    Login
                                </Link>
                            </>
                        )
                    }

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white md:hidden"
                >
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-orange-500 bg-black md:hidden">
                    <div className="flex flex-col space-y-4 px-6 py-4">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-white transition hover:text-orange-500"
                        >
                            Home
                        </Link>


                        { 
                            isLoggedIn ? 
                            (
                                <>
                                    <Link
                                        href="/orders"
                                        onClick={() => setIsOpen(false)}
                                        className="text-white transition hover:text-orange-500"
                                    >
                                        Orders
                                    </Link>

                                    <button
                                        onClick={() => logout()}
                                        className="rounded-md bg-orange-500 px-4 py-2 text-center font-medium text-black transition hover:bg-orange-400"
                                    >
                                        Logout
                                    </button>
 

                                </>

                            ) : 
                            (   
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-md bg-orange-500 px-4 py-2 text-center font-medium text-black transition hover:bg-orange-400"
                                    >
                                        Login
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            )}
        </nav>
    );
}
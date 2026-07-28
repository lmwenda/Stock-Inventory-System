"use client";

import React from "react";
import LoginUser from "./Login";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginForm()
{
    const [ msg, setMsg ] = React.useState<string>("");
    const [ email, setEmail ] = React.useState<string>("")
    const [ password, setPassword ] = React.useState<string>("");

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const submitForm: React.MouseEventHandler<HTMLButtonElement> = async(e) => 
    {
        e.preventDefault();

        const request = await LoginUser(email, password);

        setMsg(request.message);
        
        if(request.token.length >= 1)
        {
            localStorage.setItem("token", request.token);
            window.location.href = "/";
        }
        
    }

    return(
       <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
            <div className="w-full max-w-md rounded-2xl border border-orange-500 bg-zinc-900 p-8 shadow-xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-orange-500">
                        Login
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Sign in to your inventory account
                    </p>
                </div>

                {msg && (
                    <div className="mb-6 rounded-lg border border-orange-500 bg-orange-500/10 p-3 text-center text-orange-400">
                        {msg}
                    </div>
                )}

                <div className="space-y-5">

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-white">
                            Email
                        </label>

                        <input
                            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-orange-500"
                            onChange={emailHandler}
                            type="email"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-white">
                            Password
                        </label>

                        <input
                            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-orange-500"
                            onChange={passwordHandler}
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        className="mt-4 w-full rounded-lg bg-orange-500 py-3 text-lg font-semibold text-black transition hover:bg-orange-400"
                        onClick={submitForm}
                    >
                        Login
                    </button>

                    <Link className="text-orange-500" href="/register">Don't got an account? Register now!</Link>

                </div>

            </div>
        </div>
    );
}
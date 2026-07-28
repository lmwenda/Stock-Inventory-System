"use client";

import React from "react";
import LoginUser from "./Login";
import { redirect } from "next/navigation";

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
            redirect("/");
        }
        
    }

    return(
        <div className="m-3 flex flex-col space-y-3 border border-black rounded-lg">
            <div className="m-3 flex justify-center">
                <h1 className="font-bold">Login</h1>
            </div>

            <h2>{msg}</h2>

            <div className="m-3 flex flex-col">
                <label>Email </label>
                <input className="border border-gray-500 rounded-md" onChange={emailHandler} type="email" />
            </div>

            <div className="m-3 flex flex-col">
                <label>Password</label>
                <input className="border border-gray-500 rounded-md"onChange={passwordHandler} type="password" />
            </div>

            <button className="m-3 h-10 border border-black rounded-md" onClick={submitForm}>Login</button>
        </div>
    );
}
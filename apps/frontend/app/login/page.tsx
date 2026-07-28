"use client";

import React from "react";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default function Login()
{

    React.useEffect(() => {
        const token = localStorage.getItem("token");

        if(token)
        {
            redirect("/");
        }
    }, []);


    return(
        <div>
            <LoginForm />
        </div>
    );
}
"use client";

import React from "react";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";

export default function Register()
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
            <RegisterForm />
        </div>
    );
}
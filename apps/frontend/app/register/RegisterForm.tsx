"use client";

import React from "react";
import RegisterUser from "./RegisterUser";
import { redirect } from "next/navigation";

export default function RegisterForm()
{
    const [ msg, setMsg ] = React.useState<string>("");

    const [ firstName, setFirstName ] = React.useState<string>("");
    const [ lastName, setLastName ] = React.useState<string>("");
    const [ phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [ email, setEmail ] = React.useState<string>("");
    const [ password, setPassword ]= React.useState<string>("");

    const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setLastName(e.target.value);
    }

    const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPhoneNumber(e.target.value);
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value);
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(e.target.value);
    }

    const submitForm: React.MouseEventHandler<HTMLButtonElement> = async(e) => 
    {
        e.preventDefault();

        const body = {
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
            Email: email,
            Password: password
        };

        // console.log(body);

        const response = await RegisterUser(body);

        if (response == false)
        {
            setMsg("Account registeration has failed...")
        } else {
            setMsg("Account is created...")
            redirect("/login");
        }
    }

    return(
        <div className="m-3 flex flex-col space-y-3 border border-black rounded-lg">
            <div className="m-3 flex justify-center">
                <h1 className="font-bold">Register</h1>
            </div>

            <h2>{msg}</h2>


            <div className="m-3 flex flex-col">
                <label>First Name</label>
                <input className="border border-gray-500 rounded-md" onChange={firstNameHandler} type="text" />
            </div>

            <div className="m-3 flex flex-col">
                <label>Last Name</label>
                <input className="border border-gray-500 rounded-md" onChange={lastNameHandler} type="text" />
            </div>

            <div className="m-3 flex flex-col">
                <label>Phone Number</label>
                <input className="border border-gray-500 rounded-md" onChange={phoneNumberHandler} type="text" />
            </div>

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
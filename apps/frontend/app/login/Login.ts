import { BASE_URL } from "../exportedVariables";

type TLogin = {
    type: string,
    payload: TLoginPayload
}

type TLoginPayload = {
    token: string,
    message: string
}

async function LoginUser(email: string, password: string): Promise<TLoginPayload>
{
    const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Email: email,
            Password: password
        })
    });

    const data = await response.json();
    
    return data.payload;
}

export default LoginUser;
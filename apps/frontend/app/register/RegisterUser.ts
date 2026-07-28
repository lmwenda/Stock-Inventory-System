type TRegisterBody = {
    FirstName: string,
    LastName: string,
    PhoneNumber: string,
    Email: string,
    Password: string
}

const RegisterUser = async(body: TRegisterBody): Promise<boolean> => {
    const response = await fetch("http://localhost:5000/api/users/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FirstName: body.FirstName,
            LastName: body.LastName,
            PhoneNumber: body.PhoneNumber,
            Email: body.Email,
            Password: body.Password
        }),
    })
    
    if(response.status == 400) 
    {
        return false;
    } else if(response.status == 200){
        return true;
    }  

    return false;
}

export default RegisterUser;
import { z } from "zod";

const CreateUserValidation = z.object({
    FirstName: z.string().nonempty(),
    LastName: z.string().nonempty(),
    PhoneNumber: z.string().nonempty(),
    Email: z.email(),
    Password: z.string().min(6)
})

type TCreateUserValidation = z.infer<typeof CreateUserValidation>;


const LoginUserValidation = z.object({
    Email: z.email(),
    Password: z.string().min(6)
})

type TLoginUserValidation = z.infer<typeof LoginUserValidation>;

export { CreateUserValidation, TCreateUserValidation, LoginUserValidation, TLoginUserValidation}
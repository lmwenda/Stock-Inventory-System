import { z } from "zod";

const CreateUserValidation = z.object({
    FirstName: z.string().nonempty(),
    LastName: z.string().nonempty(),
    Email: z.email(),
    Password: z.string().min(6)
})

type TCreateUserValidation = z.infer<typeof CreateUserValidation>;


export { CreateUserValidation, TCreateUserValidation }
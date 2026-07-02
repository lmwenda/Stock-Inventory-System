import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { CreateUserValidation, TCreateUserValidation } from "../validation/user.schema";

class UserController{
    constructor(private readonly userService: UserServices){}

    public async createUser(req: Request, res: Response) {
        const body: TCreateUserValidation = CreateUserValidation.parse(req.body);
        await this.userService.createUser(body)       
   }
}

export default UserController;
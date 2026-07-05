import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { CreateUserValidation, LoginUserValidation, TCreateUserValidation, TLoginUserValidation } from "../validation/user.schema";

class UserController{
    constructor(private readonly userService: UserServices){}

    public async createUser(req: Request, res: Response) {
          console.log(req.body);
          const body: TCreateUserValidation = CreateUserValidation.parse(req.body);
          const user = await this.userService.createUser(body)       
          if (user == null) {
               res.send("Account already exists...")
          } 
   }

   public async loginUser(req: Request, res: Response) {
          console.log(req.body);
          const body: TLoginUserValidation = LoginUserValidation.parse(req.body);
          console.log(body);
          const token: string | boolean = await this.userService.loginUser(body);

          if(token == false) {
               res.json({ type: "Fail", payload: { token: null, message: "Wrong Credentials..." }})
          } 
          else {
               res.json({ type: "Success", payload: { token, message: "Sucessfully Logged in..."}})
          }
   }
}

export default UserController;
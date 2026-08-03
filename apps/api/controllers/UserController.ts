import { z } from "zod";
import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { CreateUserValidation, LoginUserValidation, TCreateUserValidation, TLoginUserValidation } from "../validation/user.schema";

class UserController{
    constructor(private readonly userService: UserServices){}

    public async createUser(req: Request, res: Response) {
          console.log(req.body);

          const result = CreateUserValidation.safeParse(req.body);
          if(!result.success) return res.status(400).json({ type: "Fail", message: result.error.issues[0].message });

          const body: TCreateUserValidation = result.data as TCreateUserValidation;
          const user = await this.userService.createUser(body);       

          if (user == null) {
               console.log("account already exists...")
               res.status(400).send("Account already exists...");
          } else {
               console.log("account registered...")
               res.status(200);
               res.send("User registered...")
          }
   }

   public async loginUser(req: Request, res: Response) {
          console.log(req.body);

          const result = LoginUserValidation.safeParse(req.body);

          if(!result.success)
          {
               console.log(result.error.issues[0].message)
               res.status(400).json({ type: "Fail", payload: { message: result.error.issues[0].message}});
               return 0;
          }
          else {
               console.log(result.data);
          }

          const body = result.data as TLoginUserValidation;

          const token: string | boolean = await this.userService.loginUser(body);

          if(token == false) {
               res.json({ type: "Fail", payload: { token: null, message: "Wrong Credentials..." }})
          } 
          else {
               res.status(200).json({ type: "Success", payload: { token, message: "Sucessfully Logged in..."}})
          }
   }

   public async deleteUser(req: Request, res: Response)
   {
     const token: string = req.body.token;
     
     const result = await this.userService.deleteUser(token);

     if(!result) return res.status(400).json({ type: "Fail", payload: { message: "Unable to delete User..." }});

     res.status(200).json({ type: "Success", payload: { message: "Deleted User... "}});
   }

   public async getUserStock(req: Request, res: Response) {
     const token: string = req.body.token;
     
     const stock = await this.userService.getStock(token);

     if(stock == null){
          res.json({ type: "Fail", payload: { message: "Invalid Token"}});
     }else {
          res.json({ type:" Success", payload: { stock, message: "Valid Token"} })
     }
   }
}

export default UserController;
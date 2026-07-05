import { Router, Request, Response } from "express";
import { userController} from "../app";
import { CREATE_USER_ENDPOINT, LOGIN_USER_ENDPOINT } from "../utils/exportedVariables";
import { LoginUserValidation } from "../validation/user.schema";

const UserRoute = Router();

UserRoute.post(CREATE_USER_ENDPOINT, (req: Request, res: Response) => {
    userController.createUser(req, res);
});

UserRoute.post(LOGIN_USER_ENDPOINT, (req: Request, res: Response) => {
    userController.loginUser(req, res);
})


export default UserRoute;
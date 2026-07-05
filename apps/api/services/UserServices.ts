import * as bcrypt from "bcrypt";
import { TCreateUserValidation, TLoginUserValidation } from "../validation/user.schema";
import UserRepository from "../repositories/UserRepository";
import { IGetUser, IUser } from "../utils/exportedInterfaces";
import UserDTO from "../utils/CreateUserDTO";
import * as jwt from "jsonwebtoken";
import { Signature } from "typescript";


class UserServices {
    // nothing from express exists in here

    constructor(private readonly userRepository: UserRepository){}

    public async createUser(body: TCreateUserValidation) {
        // the main logic  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword: string =  (await bcrypt.hash(body.Password, salt)).toString(); // no longer Promise<String>

        const user = this.userRepository.create(
            {
                FirstName: body.FirstName,
                LastName: body.LastName,
                PhoneNumber: body.PhoneNumber,
                Email: body.Email,
                Password: hashedPassword
            }
        );

        if (user == null){
            return null;
        } else {
            return user;
        }
    }


    public async loginUser(body: TLoginUserValidation): Promise<string | boolean> {
        // compare passwords and email
        const p_Body: IGetUser = { UserID: undefined, Email: body.Email}
        const user: Promise<IUser> = this.userRepository.get(p_Body)

        const hashedPassword: any = (await user).Password // Any because it will always be string
        const validPassword = bcrypt.compare(body.Password, hashedPassword);

        const jwtToken: string = process.env.JWT_TOKEN as string;

        // send jwt token

        if (body.Email == (await user).Email && await validPassword)
        {
            const token = jwt.sign({ id: (await user).UserID }, jwtToken, {
                expiresIn: "7 Days",
            });

            console.log("Token Signed...")

            return token;
        } else {
            return false;
        }
    }

}

export default UserServices;
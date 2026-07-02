import * as bcrypt from "bcrypt";
import { TCreateUserValidation } from "../validation/user.schema";

class UserServices {
    // nothing from express exists in here
    public async createUser(body: TCreateUserValidation) {
        // the main logic  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  bcrypt.hash(body.Password, salt);

        
    }
}

export default UserServices;
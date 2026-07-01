import CreateUserDTO from "../utils/CreateUserDTO";

class UserController {
    constructor(){
    
    }

    public async createUser(): Promise<CreateUserDTO> {
        const CreateUser: CreateUserDTO = {
            username: "hello"
        }


        return CreateUser;
    }
}

export default UserController;
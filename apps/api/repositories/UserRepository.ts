import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../database/connection";
import UserDTO from "../utils/CreateUserDTO";
import { ICreateUser, IGetUser, IUser, IUserQuery } from "../utils/exportedInterfaces";
import { TCreateUserValidation } from "../validation/user.schema";

class UserRepository {
    public async create(body: TCreateUserValidation): Promise<UserDTO | null> {

        const [existing] = await pool.execute<RowDataPacket[]>(
            "SELECT UserID FROM User WHERE Email = ?",
            [body.Email]
        );

        if (existing.length > 0) {
            // console.log("Account exists...") DEBUGGING
            return null;
        }

        const [result] = await pool.execute<ResultSetHeader>(
            `
            INSERT INTO User
            (FirstName, LastName, PhoneNumber, Email, Password)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                body.FirstName,
                body.LastName,
                body.PhoneNumber,
                body.Email,
                body.Password
            ]
        );

        console.log("Account Created...")

        return {
            UserID: result.insertId,
            FirstName: body.FirstName,
            LastName: body.LastName,
            PhoneNumber: body.PhoneNumber,
            Email: body.Email
        };
    }

    public async get(body: IGetUser): Promise<any>{
        // request
        let _id: number;

        if (body.UserID != undefined) {
            _id = body.UserID;
 
            const [ result ] = await pool.execute<RowDataPacket[]>(
                "SELECT * FROM User WHERE UserID=?",
                [
                    _id
                ]
            );
            const userRow = result[0];
        
            if (!userRow || userRow.length === 0) {
            throw new Error(`User not found with ID ${body.UserID} or Email ${body.Email}`);
            }
            // returning
            return {
                UserID: userRow.UserID,
                FirstName: userRow.FirstName,
                LastName: userRow.LastName,
                PhoneNumber: userRow.PhoneNumber,
                Email: userRow.Email,
                Password: userRow.Password
            }
        }

        else if(body.Email != undefined) {
            const [ result ] = await pool.execute<RowDataPacket[]>(
                "SELECT * FROM User WHERE UserID=? OR Email=?",
                [
                    "",
                    body.Email
                ]
            );
            
            const userRow = result[0];
        
            if (!userRow || userRow.length === 0) {
            throw new Error(`User not found with ID ${body.UserID} or Email ${body.Email}`);
            }
            // returning
            return {
                UserID: userRow.UserID,
                FirstName: userRow.FirstName,
                LastName: userRow.LastName,
                PhoneNumber: userRow.PhoneNumber,
                Email: userRow.Email,
                Password: userRow.Password
            }
        }
        throw new Error("Either UserID or email must be provided.");
    }
}

export default UserRepository;
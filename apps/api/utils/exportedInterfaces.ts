import { RowDataPacket } from "mysql2"

interface ICreateUser {
    UserID: Number,
    FirstName: String,
    LastName: String,
    PhoneNumber: String,
    Email: String,
    Password: String | Promise<String>
}

interface IGetUser {
    UserID?: number,
    Email?: string 
}

interface IUser {
    UserID: number,
    FirstName: string,
    LastName: string,
    PhoneNumber: string,
    Email: string,
    Password: string | Promise<string>
}

interface IUserQuery extends RowDataPacket {
    UserID: number,
    FirstName: string,
    LastName: string,
    PhoneNumber: string,
    Email: string,
    Password: string | Promise<string>
}

export { IUser, IUserQuery, ICreateUser, IGetUser}
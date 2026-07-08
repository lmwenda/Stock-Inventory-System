import { JwtPayload } from "jsonwebtoken"
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
// Order ID (Primary Key)
//     - Product ID (Foreign Key)
//     - Product Name
//     - UserID (Foreign Key) // Who this Order is connected to 
//     - DeliveryDate
//     - OrderDate 
//     - Product Quantity
//     - Status // OrderCreated, OrderFailed, etc


interface Product {
    ProductID: number,
    ProductName: string,
    DeliveryDate: Date,
    OrderDate: Date
}

interface Stock extends RowDataPacket{
    UserID: number,
    ProductID: number,
    Quantity: number
}

interface UserJWTPayload extends JwtPayload{
    id: number,
    iat: number,
    exp: number
}

export { UserJWTPayload, Stock, Product, IUser, IUserQuery, ICreateUser, IGetUser}
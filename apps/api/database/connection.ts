import mysql2 from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
}).promise();

export default pool;
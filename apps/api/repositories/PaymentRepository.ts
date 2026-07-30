import { ResultSetHeader } from "mysql2";
import pool from "../database/connection";
import { Transaction } from "../utils/exportedInterfaces";

class PaymentRepository {
    public async CreateTransaction(body: Transaction) 
    {

        const [ result ] = await pool.execute<ResultSetHeader>
        (
            `
            INSERT INTO Transaction(TransactionID, UserID, Amount, Currency, status, CreatedAt)
            VALUES(?, ?, ?, ?, ?, Now());
            `,
            [
                body.TransactionID,
                body.UserID,
                body.Amount,
                body.Currency,
                body.status
            ]
        );
        
        return result;
    }
}

export default PaymentRepository;


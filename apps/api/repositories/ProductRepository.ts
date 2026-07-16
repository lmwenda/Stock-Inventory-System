import { ResultSetHeader } from "mysql2";
import pool from "../database/connection";
import { Product, SqlProduct } from "../utils/exportedInterfaces";
import { parse } from "dotenv";

class ProductRepository { 
    public async getAll(): Promise<SqlProduct[]>
    {
        const [ result ] = await pool.execute<SqlProduct[]>(
            "SELECT * FROM Product"
        );

        return result;
    }

    public async get(productID: number): Promise<Product>
    {
        const [ result ] = await pool.execute<SqlProduct[]>(
            "SELECT * FROM PRODUCT WHERE ProductID=?",
            [
                productID
            ]
        );

        const productRow = result[0];

        if (!productRow)
        {
            throw new Error(`Product doesn't exist with the ID: ${productID}`);
        }

        return {
            SKU: productRow.SKU,
            ProductID: productRow.ProductID,
            ProductName: productRow.ProductName,
            Description: productRow.Description,
            Category: productRow.Category,
            Price: productRow.price,
            Image: productRow.Image,
            StockCount: productRow.StockCount
        };
    }

    public async write(body: Product) 
    {
        const [ existing ] = await pool.execute<SqlProduct[]>(
            "SELECT * FROM Product where ProductName=?",
            [body.ProductName]
        );

        if(existing.length > 0)
        {
            console.log("Product exists already...");
            return null;
        }

        let parsedBody: SqlProduct = body as SqlProduct;

        const [ result ] = await pool.execute<ResultSetHeader>
        (
            `
            INSERT INTO Product(SKU, ProductName, Description, Category, Price, Image, StockCount, CreatedAt, UpdatedAt)
            VALUES(?, ?, ?, ?, ?, ?, ?, Now(), Now());
            `,
            [
                parsedBody.SKU,
                parsedBody.ProductName,
                parsedBody.Description,
                parsedBody.Category,
                parsedBody.Price,
                parsedBody.Image,
                parsedBody.StockCount
            ]
        );

        return result;
    }
}

export default ProductRepository;
import * as jwt from "jsonwebtoken";
import { Product, SqlProduct, UserJWTPayload } from "../utils/exportedInterfaces";
import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";

class ProductServices { 
    private secretT: string; 

    constructor(private readonly productRepository: ProductRepository, private readonly userRepository: UserRepository){
        this.secretT = process.env.JWT_TOKEN as string;
    }

    public async getAllProducts(token: string): Promise<Product[] | null> 
    {
        const verifyToken = jwt.verify(token, this.secretT) as UserJWTPayload;

        if(verifyToken)
        {
            const products = await this.productRepository.getAll() as Product[];
            return products;
        } else {
            return null;
        }
    }

    public async addProduct(token: string, body: Product)
    {
        const verifyToken = jwt.verify(token, this.secretT) as UserJWTPayload;

        if(verifyToken)
        {
            await this.productRepository.write(body);
        }
    }

    public async getDummyProductServices()
    {
        const apiURL: string = "https://dummyjson.com/products";
        
        try{ 
            const response  =  await fetch(apiURL);
            const data = await response.json();

            return data;
        } 
        
        catch (error) 
        {
            console.log("Fetch Failed: ", error);
        }
    }

    public async productInjectionServices(token: string, data: any)
    {
        const jwtToken = process.env.JWT_TOKEN as string;
        const verifyToken = jwt.verify(token, jwtToken) as UserJWTPayload;
        const admin = this.userRepository.isAdmin(verifyToken.id);

        // Only Admins can Inject Database
        if (verifyToken && await admin)
        {
            for(let product in data.products)
            {
                const fetchedProduct = data.products[product];

                const body: Product = {
                    ProductID: fetchedProduct.id,
                    SKU: fetchedProduct.sku,
                    ProductName: fetchedProduct.title,
                    Description: fetchedProduct.description,
                    Category: fetchedProduct.category,
                    Price: fetchedProduct.price,
                    Image: fetchedProduct.images[0],
                    StockCount: fetchedProduct.stock
                }

                console.log(body);

                await this.productRepository.write(body);
            }
        }

        else 
        {
            throw new Error("Not Authenticated for this Request.");
        }
    }

    public async getProductServices(token: string, productID: number): Promise<Product | null>
    {
        const jwtToken = process.env.JWT_TOKEN as string;
        const verifiedToken = jwt.verify(token, jwtToken) as UserJWTPayload;

        if(verifiedToken.id)
        {
            const product: Promise<Product> =  this.productRepository.get(productID);

            return product;
        } 
        else {
            return null;
        }
    }
}

export default ProductServices;
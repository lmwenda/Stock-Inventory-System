import { Request, Response } from "express";
import ProductServices from "../services/ProductServices";
import { Product } from "../utils/exportedInterfaces";

class ProductController { 
    constructor(private readonly productService: ProductServices){}

    public async getAllProducts(req: Request, res: Response)
    {
        const token: string = req.body.token;
        const products = await this.productService.getAllProducts(token);

        if (products)
        {
            res.json({ type: "Success", payload: { products }})
        } 
        
        else {
            res.json({ type: "Failure", payload: { message: "Failed to fetch Products from Database... "}})
        }
    }

    public async addProducts(req: Request, res: Response) 
    {
        const body: Product = {
            SKU: req.body.SKU,
            ProductName: req.body.ProductName,
            Description: req.body.Description,
            Category: req.body.Category,
            Price: req.body.Price,
            StockCount: req.body.StockCount
        }

        const token: string = req.body.token;

        await this.productService.addProduct(token, body)
    }

    public async dataInjection(req: Request, res: Response)
    {
        // Retrieve Products from API

        const token: string = req.body.token;
        const data = await this.productService.getDummyProductServices();

        // Inject products into DB and Authenticate Request

        await this.productService.productInjectionServices(token, data);

    }

    public async getProduct(req: Request, res: Response) 
    {
        const token: string = req.body.token;

        const { id } = req.params;
        const productID: number = Number(id);

        const _product: Promise<Product | null>  = this.productService.getProductServices(token, productID);

        if(_product != null)
        {
            const product: Product = await _product as Product;

            res.json({ type: "Success", payload: { product, message: "Retrieved Product from Database..." }})
        }
        else 
        {
            res.json({ type: "Failed", payload: { product: null, message: "Product doesn't exist..." }})
        }
    }
}


export default ProductController;
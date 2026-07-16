import { Router, Request, Response } from "express";
import { ADD_PRODUCT_ENDPOOINT, GET_ALL_PRODUCTS_ENDPOINT, GET_PRODUCT_ENDPOINT, UPDATE_PRODUCT_DATABASE_ENDPOINT } from "../utils/exportedVariables";
import { productController } from "../app";

const ProductRoutes = Router();

ProductRoutes.post(GET_ALL_PRODUCTS_ENDPOINT, (req: Request, res: Response) => {
    productController.getAllProducts(req, res);
})

ProductRoutes.post(ADD_PRODUCT_ENDPOOINT, (req: Request, res: Response) => {
    productController.addProducts(req, res);
});

ProductRoutes.post(GET_PRODUCT_ENDPOINT, (req: Request, res: Response) => {
    productController.getProduct(req, res);
})

// DATA INJECTION ROUTE
ProductRoutes.post(UPDATE_PRODUCT_DATABASE_ENDPOINT, (req: Request, res: Response) => {
    productController.dataInjection(req, res);
})

export default ProductRoutes;
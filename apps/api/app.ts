import express, { Application } from "express";
import "./database/connection";
import { port } from "./utils/exportedVariables";
import UserRoute from "./routes/UserRoutes";
import UserController from "./controllers/UserController";
import UserServices from "./services/UserServices";
import UserRepository from "./repositories/UserRepository";
import ProductRoutes from "./routes/ProductRoutes";
import ProductController from "./controllers/ProductController";
import ProductServices from "./services/ProductServices";
import ProductRepository from "./repositories/ProductRepository";

const app: Application = express();

// Middlewares & Dependency Injection 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const userRepository = new UserRepository()
export const userService = new UserServices(userRepository);
export const userController = new UserController(userService);

export const productRepository = new ProductRepository();
export const productService = new ProductServices(productRepository, userRepository);
export const productController = new ProductController(productService);

// Routes
app.use("/api/users", UserRoute)
app.use("/api/products", ProductRoutes);

// Listening Func

app.listen(port, () => console.log(`Server running on https://localhost:${port}/`))

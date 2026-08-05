import express, { Application } from "express";
import cors from "cors";
import "./database/connection";
import UserRoute from "./routes/UserRoutes";
import UserController from "./controllers/UserController";
import UserServices from "./services/UserServices";
import UserRepository from "./repositories/UserRepository";
import ProductRoutes from "./routes/ProductRoutes";
import ProductController from "./controllers/ProductController";
import ProductServices from "./services/ProductServices";
import ProductRepository from "./repositories/ProductRepository";
import PaymentRoutes from "./routes/PaymentRoutes";
import PaymentServices from "./services/PaymentServices";
import PaymentController from "./controllers/PaymentController";
import PaymentRepository from "./repositories/PaymentRepository";

const app: Application = express();

// Middlewares & Dependency Injection 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const userRepository = new UserRepository()
export const userService = new UserServices(userRepository);
export const userController = new UserController(userService);

export const productRepository = new ProductRepository();
export const productService = new ProductServices(productRepository, userRepository);
export const productController = new ProductController(productService);

export const paymentRepository = new PaymentRepository()
export const paymentService = new PaymentServices(paymentRepository);
export const paymentController = new PaymentController(paymentService);

// Routes
app.use("/api/users", UserRoute)
app.use("/api/products", ProductRoutes);
app.use("/api/payments", PaymentRoutes);

export default app;

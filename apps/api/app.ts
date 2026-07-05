import express, { Application } from "express";
import "./database/connection";
import { port } from "./utils/exportedVariables";
import UserRoute from "./routes/UserRoutes";
import UserController from "./controllers/UserController";
import UserServices from "./services/UserServices";
import UserRepository from "./repositories/UserRepository";

const app: Application = express();

// Middlewares & Dependency Injection 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const userRepository = new UserRepository()
export const userService = new UserServices(userRepository);
export const userController = new UserController(userService);

// Routes
app.use("/api/users", UserRoute)

// Listening Func

app.listen(port, () => console.log(`Server running on https://localhost:${port}/`))

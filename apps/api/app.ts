import express, { Application } from "express";
import { port } from "./utils/exportedVariables";
import UserRoute from "./routes/UserRoutes";
import UserController from "./controllers/UserController";
import UserServices from "./services/UserServices";

const app: Application = express();

// Middlewares & Dependency Injection 
export const userService = new UserServices();
export const userController = new UserController(userService);


// Routes
app.use("api/users", UserRoute)

// Listening Func

app.listen(port, () => console.log(`Server running on https://localhost:${port}/`))

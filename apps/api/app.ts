import express, { Application } from "express";
import { port } from "./utils/exportedVariables";
import UserRoute from "./routes/UserRoute";

const app: Application = express();

// Middlewares


// Routes
app.use("api/users", UserRoute)

// Listening Func

app.listen(port, () => console.log(`Server running on https://localhost:${port}/`))
import express from "express";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import { connectDb } from "./db/db.js";
import { globalErrorHandler } from "./factory/error.factory.js";
import { authRouter } from "./router/auth.router.js";
import { userRouter } from "./router/user.router.js";
import { logger } from "./middleware/logger.js";
import { config } from "./config/env.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(helmet());

connectDb();    

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use(logger);

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(globalErrorHandler.handleError);

app.listen(config.port, () => {
    console.log(`App running on port ${process.env.PORT}`);
})
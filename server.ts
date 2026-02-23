import express from "express";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import { connectDb } from "./db/db";
import { globalErrorHandler } from "./factory/error.factory";
import { userRouter } from "./router/user.router";
import { logger } from "./middleware/logger";
import { config } from "./config/env";

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(helmet());

connectDb();    

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use(logger);
app.use("/user", userRouter);

app.use(globalErrorHandler.handleError);

app.listen(config.port, () => {
    console.log(`App running on port ${process.env.PORT}`);
})
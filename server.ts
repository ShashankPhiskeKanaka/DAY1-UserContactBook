import express from "express";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import { connectDb } from "./db/db";
import { globalErrorHandler } from "./factory/error.factory";
import { contactRouter } from "./router/contact.router";
import { logger } from "./middleware/logger";
import { config } from "./config/env";
import { connectPrisma } from "./db/prisma";
import { reportRouter } from "./router/report.router";
import { contactsRouter } from "./router/contacts.router";

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(helmet());

connectPrisma();  

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use(logger);
app.use("/contact", contactRouter);
app.use("/contacts", contactsRouter);
app.use("/reports", reportRouter);

app.use(globalErrorHandler.handleError);

app.listen(config.port, () => {
    console.log(`App running on port ${process.env.PORT}`);
})
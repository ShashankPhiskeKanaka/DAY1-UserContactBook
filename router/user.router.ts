import express from "express";
import { userFactory } from "../factory/user.factory.js";
import { errorHandler } from "../factory/error.factory.js";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../schema/user.schema.js";

const userRouter = express.Router();
const userController = userFactory.create();

userRouter.post("/create", errorHandler.controllerWrapper(validate(createUserSchema)), errorHandler.controllerWrapper(userController.createUser));
userRouter.post("/getbyemail",  errorHandler.controllerWrapper(validate(createUserSchema)),errorHandler.controllerWrapper(userController.getUser));
userRouter.get("/getall", errorHandler.controllerWrapper(userController.getAllUsers));
userRouter.put("/update",  errorHandler.controllerWrapper(validate(createUserSchema)),errorHandler.controllerWrapper(userController.updateUser));
userRouter.delete("/delete",  errorHandler.controllerWrapper(validate(createUserSchema)),errorHandler.controllerWrapper(userController.deleteUser));

export { userRouter };
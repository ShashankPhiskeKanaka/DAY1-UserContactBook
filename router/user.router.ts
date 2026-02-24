import express from "express";
import { userFactory } from "../factory/user.factory";
import { errorHandler } from "../factory/error.factory";
import { validate } from "../middleware/validate";
import { createUserSchema, userSchema } from "../schema/user.schema";

// generating instances of user router and controller
const userRouter = express.Router();
const userController = userFactory.create();

// fetching all users
userRouter.get("/", errorHandler.controllerWrapper(userController.getAllUsers));

// schema validation, checks for body object and email attribute inside it
userRouter.use(errorHandler.controllerWrapper(validate(userSchema)))

userRouter.post("/",errorHandler.controllerWrapper(userController.getUser));
userRouter.patch("/", errorHandler.controllerWrapper(userController.updateUser));
userRouter.delete("/" ,errorHandler.controllerWrapper(userController.deleteUser));

// schema validation, checks for body object and email, phonenumber attribute inside it
userRouter.use(errorHandler.controllerWrapper(validate(createUserSchema)));
userRouter.post("/create", errorHandler.controllerWrapper(userController.createUser));

export { userRouter };
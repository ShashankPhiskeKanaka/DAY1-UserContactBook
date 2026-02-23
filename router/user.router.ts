import express from "express";
import { userFactory } from "../factory/user.factory";
import { errorHandler } from "../factory/error.factory";
import { validate } from "../middleware/validate";
import { createUserSchema, userSchema } from "../schema/user.schema";

const userRouter = express.Router();
const userController = userFactory.create();

userRouter.get("/", errorHandler.controllerWrapper(userController.getAllUsers));

userRouter.use(errorHandler.controllerWrapper(validate(userSchema)))

userRouter.post("/",errorHandler.controllerWrapper(userController.getUser));
userRouter.put("/", errorHandler.controllerWrapper(userController.updateUser));
userRouter.delete("/" ,errorHandler.controllerWrapper(userController.deleteUser));

userRouter.use(errorHandler.controllerWrapper(validate(createUserSchema)));
userRouter.post("/create", errorHandler.controllerWrapper(userController.createUser));

export { userRouter };
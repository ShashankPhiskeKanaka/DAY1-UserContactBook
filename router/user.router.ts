import express from "express";
import { userFactory } from "../factory/user.factory";
import { errorHandler } from "../factory/error.factory";
import { validate } from "../middleware/validate";
import { createUserSchema } from "../schema/user.schema";

const userRouter = express.Router();
const userController = userFactory.create();

userRouter.get("/getall", errorHandler.controllerWrapper(userController.getAllUsers));

userRouter.use(errorHandler.controllerWrapper(validate(createUserSchema)));

userRouter.post("/create", errorHandler.controllerWrapper(userController.createUser));
userRouter.post("/getbyemail",errorHandler.controllerWrapper(userController.getUser));
userRouter.put("/update", errorHandler.controllerWrapper(userController.updateUser));
userRouter.delete("/delete" ,errorHandler.controllerWrapper(userController.deleteUser));

export { userRouter };
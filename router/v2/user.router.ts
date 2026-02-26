import express from "express"
import { errorHandler } from "../../factory/error.factory";
import { userFactory } from "../../factory/user.factory";
import { validate } from "../../middleware/validate";
import { createUserSchema } from "../../schema/user.schema";
import { authSchema } from "../../schema/auth.schema";
import { authorize } from "../../middleware/authorize";

const userRouter = express.Router();
const userController = userFactory.create();

userRouter.post("/", errorHandler.controllerWrapper(validate(createUserSchema)), errorHandler.controllerWrapper(userController.create));

userRouter.use(errorHandler.controllerWrapper(authorize));
userRouter.delete("/", errorHandler.controllerWrapper(validate(authSchema)), errorHandler.controllerWrapper(userController.delete));

export { userRouter }
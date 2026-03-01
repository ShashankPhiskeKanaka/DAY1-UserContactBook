import express from "express"
import { fileFactory } from "../../factory/file.factory";
import { errorHandler } from "../../factory/error.factory";
import { authorize } from "../../middleware/authorize";

const fileRouter = express.Router();
const fileController = fileFactory.create();
fileRouter.post("/cloudinary", errorHandler.controllerWrapper(fileController.cloudinaryResponse));
fileRouter.use(errorHandler.controllerWrapper(authorize))
fileRouter.post("/", errorHandler.controllerWrapper(fileController.upload));
fileRouter.delete("/", errorHandler.controllerWrapper(fileController.delete));
fileRouter.get("/:id", errorHandler.controllerWrapper(fileController.get));
fileRouter.get("/", errorHandler.controllerWrapper(fileController.getAll));

export { fileRouter };
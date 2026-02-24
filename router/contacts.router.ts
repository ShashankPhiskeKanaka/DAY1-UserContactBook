import express from "express"
import { errorHandler } from "../factory/error.factory";
import { contactFactory } from "../factory/contact.factory";

const contactsRouter = express.Router();
const contactController = contactFactory.create();

contactsRouter.get("/", errorHandler.controllerWrapper(contactController.getAllContacts));

export { contactsRouter };
import express from "express"
import { errorHandler } from "../../factory/error.factory";
import { contactFactory } from "../../factory/contact.factory";
import { validate } from "../../middleware/validate";

const contactsRouter = express.Router();
const contactController = contactFactory.create();

contactsRouter.get("/",  errorHandler.controllerWrapper(contactController.getAllContacts));
// contactsRouter.get("/deleted", errorHandler.controllerWrapper(contactController.getDeletedContacts) );

export { contactsRouter };
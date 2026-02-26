import express from "express"
import { errorHandler } from "../../factory/error.factory";
import { contactFactory } from "../../factory/contact.factory";
import { validate } from "../../middleware/validate";
import { authSchema } from "../../schema/auth.schema";

const contactsRouter = express.Router();
const contactController = contactFactory.create();

contactsRouter.get("/",  errorHandler.controllerWrapper(validate(authSchema)),errorHandler.controllerWrapper(contactController.getAllContacts));
// contactsRouter.get("/deleted", errorHandler.controllerWrapper(contactController.getDeletedContacts) );

export { contactsRouter as v2ContactsRouter };
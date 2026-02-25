import express from "express"
import { errorHandler } from "../../factory/error.factory";
import { contactFactory } from "../../factory/contact.factory";
import { validate } from "../../middleware/validate";
import { contactsFetchSchema } from "../../schema/contact.schema";

const contactsRouter = express.Router();
const contactController = contactFactory.create();

contactsRouter.get("/",  errorHandler.controllerWrapper(contactController.getAllContacts));

export { contactsRouter };
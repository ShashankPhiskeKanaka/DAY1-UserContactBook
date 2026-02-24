import express from "express";
import { contactFactory } from "../factory/contact.factory";
import { errorHandler } from "../factory/error.factory";
import { validate } from "../middleware/validate";
import { createContactSchema, contactFetchSchema, contactSchema } from "../schema/contact.schema";

// generating instances of user router and controller
const contactRouter = express.Router();
const contactController = contactFactory.create();

// fetches an user, validates if email parameter is provided or not
contactRouter.get("/:email", errorHandler.controllerWrapper(validate(contactFetchSchema)) , errorHandler.controllerWrapper(contactController.getContact));

// deletes an user, validates if email parameter is provided or not
contactRouter.delete("/:email" , errorHandler.controllerWrapper(validate(contactFetchSchema)) , errorHandler.controllerWrapper(contactController.deleteContact));

// updates an use, validates if data in request body is provided or not (email)
contactRouter.patch("/", errorHandler.controllerWrapper(validate(contactSchema)) ,errorHandler.controllerWrapper(contactController.updateContact));

// creates an user, validates if data in request body is provided or not ( email, phonenumber )
contactRouter.post("/create", errorHandler.controllerWrapper(validate(createContactSchema)) , errorHandler.controllerWrapper(contactController.createContact));

export { contactRouter };
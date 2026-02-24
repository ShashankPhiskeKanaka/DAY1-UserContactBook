import type { Request, Response } from "express";
import type { contactServicesClass } from "../services/contact.services";
import { contactSerializer } from "../serializer/contact.serializer";

// user controller

class contactControllerClass {
    constructor ( private userService : contactServicesClass ) {} // service class passed in as parameter to the constructor

    // creates user, hands over the body object from req to the service layer
    createContact = async ( req : Request, res : Response ) => { 
        const contact = await this.userService.createContact(req.body);
        const data = contactSerializer.serialize(contact);

        return res.status(201).json({
            success : true,
            data : data
        });
    }

    // fetches single user using email, extracts the email from the req body and passes it to the service layer 
    getContact = async ( req : Request, res : Response ) => {
        const email = req.params?.email?.toString() ?? "";
        const contact = await this.userService.get(email);
        const data = contactSerializer.serialize(contact);
        return res.json({
            success : true,
            data : data
        });
    }

    // fetches all users 
    getAllContacts = async ( req : Request, res : Response ) => {
        const contacts = await this.userService.getAll();
        const data = contactSerializer.serializeAll(contacts);
        return res.json({
            success : true,
            data : data
        });
    }

    // updates the user based on the email
    updateContact = async ( req : Request, res : Response ) => {
        const contact = await this.userService.update(req.body);
        const data = contactSerializer.serialize(contact);

        return res.json({
            success : true,
            data : data
        });
    }

    // deletes the user based on email
    deleteContact = async ( req : Request, res : Response ) => {

        const email = req.params?.email?.toString() ?? "";

        const contact = await this.userService.delete(email);
        const data = contactSerializer.serialize(contact);

        return res.json({
            success : true,
            data : data
        });
    }
}

export { contactControllerClass }
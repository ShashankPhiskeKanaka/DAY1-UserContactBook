import type { Request, Response } from "express";
import { contactSerializer } from "../serializer/contact.serializer";

import requestIp from "request-ip";
import type { contactPgServicesClass } from "../services/contact.pgservices";

// user controller

class contactControllerClass {
    constructor ( private contactService : contactPgServicesClass ) {} // service class passed in as parameter to the constructor

    // creates user, hands over the body object from req to the service layer
    createContact = async ( req : Request, res : Response ) => { 
        const contact = await this.contactService.createContact(req.body);
        const data = contactSerializer.serialize(contact);

        return res.status(201).json({
            success : true,
            data : data
        });
    }

    // fetches single user using email, extracts the email from the req body and passes it to the service layer 
    getContact = async ( req : Request, res : Response ) => {
        const id = req.params?.id?.toString() ?? "";
        const contact = await this.contactService.get(id);
        const data = contactSerializer.serialize(contact);
        return res.json({
            success : true,
            data : data
        });
    }

    // fetches all users 
    getAllContacts = async ( req : Request, res : Response ) => {

        const cursor = req.query.cursor?.toString() ?? undefined;
        const limit = req.query.limit? parseInt(req.query.limit as string, 10): undefined;
        const search = req.query.search?.toString() ?? undefined;
        const sort = req.query.sort?.toString() ??  undefined;

        const data = await this.contactService.getAll(limit, cursor , search, sort);
        // const result = contactSerializer.serializeAll(data.contacts);
        return res.json({
            success : true,
            nextCursor : data.nextCursor,
            data : data.contacts
        });
    }

    // updates the user based on the email
    updateContact = async ( req : Request, res : Response ) => {

        const ip = requestIp.getClientIp(req);

        const contact = await this.contactService.update(req.body, ip ?? "");
        const data = contactSerializer.serialize(contact);

        return res.json({
            success : true,
            data : data
        });
    }

    // deletes the user based on email
    deleteContact = async ( req : Request, res : Response ) => {

        const id = req.params?.id?.toString() ?? "";
        const ip = requestIp.getClientIp(req);

        const contact = await this.contactService.delete(id, ip ?? "");
        const data = contactSerializer.serialize(contact);

        return res.json({
            success : true,
            data : data
        });
    }

    // getDeletedContacts = async ( req : Request, res : Response ) => {
    //     const contacts = await this.contactService.getDeleted();
    //     return res.json({
    //         success : true,
    //         data : contacts
    //     });
    // }
}

export { contactControllerClass }
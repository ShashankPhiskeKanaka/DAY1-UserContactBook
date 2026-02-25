import type { Request, Response } from "express";
import type { contactServicesClass } from "../services/contact.services";
import { contactSerializer } from "../serializer/contact.serializer";

import requestIp from "request-ip";

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
        const id = req.params?.id?.toString() ?? "";
        const contact = await this.userService.get(id);
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
        const email = req.query.email?.toString() ?? undefined;
        const sort = req.query.sort?.toString() ??  undefined;

        const data = await this.userService.getAll(cursor, limit, search, email, sort);
        const result = contactSerializer.serializeAll(data.contacts);
        return res.json({
            success : true,
            nextCursor : data.nextCursor,
            hasMoreData : data.hasMoreData,
            data : result
        });
    }

    // updates the user based on the email
    updateContact = async ( req : Request, res : Response ) => {

        const ip = requestIp.getClientIp(req);

        const contact = await this.userService.update(req.body, ip ?? "");
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

        const contact = await this.userService.delete(id, ip ?? "");
        const data = contactSerializer.serialize(contact);

        return res.json({
            success : true,
            data : data
        });
    }
}

export { contactControllerClass }
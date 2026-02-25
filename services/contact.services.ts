import { errorMessages } from "../constants/errorMessages.constants";
import { prisma } from "../db/prisma";
import type { baseContact } from "../model/contact.model";
import type { contactPrismaRepositoryClass } from "../repository/contact/contact.prismarepository";
import { serverError } from "../utils/error.utils";
import { logActivity } from "../utils/logging.utils";

// user service class
// email is used as an unique identifier

class contactServicesClass {
    constructor ( private contactMethods : contactPrismaRepositoryClass ) {} // repository class passed in as parameter

    // creates user, checks if user already exists or not and then creates it, returns a baseUser object
    createContact = async ( data : baseContact ) => {
        let contact = await this.contactMethods.get(data.email);
        if(contact.email) throw new serverError( errorMessages.EXISTS.status , errorMessages.EXISTS.message );
        contact = await this.contactMethods.create(data);

        logActivity.log("New user created");

        return contact;
    }

    // fetches all users, returns array of baseUsers
    getAll = async ( cursor : string | undefined, limit : number | undefined, search : string | undefined, email : string | undefined, sort : string | undefined ) => {
        const contacts = await this.contactMethods.getAll(cursor, limit, search, email, sort);
        logActivity.log("All users fetched");
        return contacts;
    }

    // fetches a single user using email, email is passed on to the repository, returns baseUser object
    get = async ( id : string ) => {
        const contact = await this.contactMethods.get(id);
        if(!contact.email) throw new serverError(404, "User does not exist");

        logActivity.log("User fetched using email");

        return contact
    }

    // updates an user using email, data is passed on to the repository, returns baseUser
    update = async ( data : baseContact, ip : string ) => {
        const existingContact = await this.get(data.id);

        const contact = await this.contactMethods.update(data);
        await this.contactMethods.createAuditLog({
            model : "Contact",
            action : "UPDATE",
            recordId : data.id,
            before : existingContact,
            after : contact,
            metadata : {
                ip : ip
            }
        })

        logActivity.log("User updated");

        return contact
    }

    // deletes an user, email is passed on to repository, returns baseUser
    delete = async ( id : string, ip : string ) => {
        await this.get(id);
        const contact = await this.contactMethods.delete(id);

        await this.contactMethods.createAuditLog({
            model : "Contact",
            action : "DELETE",
            recordId : id,
            before : contact,
            after : null,
            metadata : {
                ip : ip
            }
        })

        if(!contact.email) throw new serverError(404, "User does not exist");

        logActivity.log("User deleted");

        return contact
    }

}

export { contactServicesClass };
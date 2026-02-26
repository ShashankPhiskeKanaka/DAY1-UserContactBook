import { errorMessages } from "../constants/errorMessages.constants";
import type { baseContact, pageinationData } from "../model/contact.model";
import type { contactPgRepositoryClass } from "../repository/contact/contact.pgrepository";
import { authUtil } from "../utils/auth.utils";
import { serverError } from "../utils/error.utils";
import { logActivity } from "../utils/logging.utils";

class contactPgServicesClass {
    constructor ( private contactMethods : contactPgRepositoryClass ) {} // repository class passed in as parameter

    /**
     * 
     * creates a contact
     * 
     * intially checks if contact with similar email is available or not and then proceeds
     * 
     * logs the creation of new contact
     * 
     * @async data 
     * @returns { Promise<baseContact> } containing id, name, email, phonenumber, address, createdAt
     */
    createContact = async ( data : baseContact, token : string ) => {
        const { id, role } = authUtil.decodeToken(token);
        // checks if another contact with the specified email exists or not
        let contact = await this.contactMethods.checkExistence(data.name, data.email, data.phoneNumber, id);
        if(contact?.id) throw new serverError( errorMessages.EXISTS.status , errorMessages.EXISTS.message );

        // creates the contact
        contact = await this.contactMethods.create(data, id);

        // logging the activity of contact creation
        logActivity.log("New user created");

        return contact;
    }

    /**
     *
     * fetches the available contacts
     * 
     * fetches contacts according the the provided limit, cursor, search, email and sorting order
     * 
     * logs the activity of fetching all contacts
     *  
     * @param cursor 
     * @param limit 
     * @param search 
     * @param email 
     * @param sort 
     * @returns { Promise<pageinationData> } containing contact, nextCursor, hasMoreData
     */
    getAll = async (limit : number | undefined, cursor : string | undefined, search : string | undefined, sort : string | undefined, token : string) => {
        const userId = authUtil.defineId(token);

        let lastCreatedAt = undefined; // Default to null, not undefined
        let lastId = undefined;

        if (cursor) {
            const parts = cursor.split(':');
            if (parts.length === 2) {
                lastCreatedAt = parts[0]; // This is a String (e.g., "2024-02-26T...")
                lastId = parts[1];        // This is a String (UUID)
            }
        }

        if (sort){
            if(sort.toLowerCase() == "asc") sort = "ASC";
            if(sort.toLowerCase() == "desc") sort = "DESC";
        }else{
            sort = "ASC";
        }

        if(!search){
            search = "";
        }else{
            search = search.replace(/([%_\\])/g, '\\$1');
        }

        if(!limit){
            limit = 10;
        }

        const contacts = await this.contactMethods.getAll(limit, search, sort, lastCreatedAt, lastId, userId);
        logActivity.log("All users fetched");
        let nextCursor = "";
        if(contacts.length > 0) {
            const lastContact = contacts[contacts.length - 1];
            nextCursor = `${lastContact?.createdAt.toISOString()}:${lastContact?.id}`;
        }

        return { contacts, nextCursor};
    }

    /**
     * 
     * fetches a single contact from the db using the id
     * 
     * logs the error if no contact is found
     * 
     * logs the activity of the contact being fetched if the contact exists
     * 
     * @param id : the id of the contact record
     * @returns Object : the returned value of type baseContact
     */
    get = async ( cid : string, token : string ) => {
        const userId = authUtil.defineId(token);
        const contact = await this.contactMethods.get(cid, userId);
        if(!contact) throw new serverError(404, "Contact does not exist");
        logActivity.log("User fetched using email");

        return contact
    }

    /**
     * 
     * updates the contact record according to the id
     * 
     * creates and auditlog if the contact is available and successfully updated
     * 
     * logs the activity of contact being updated
     * 
     * @param data : the data object of type baseContact
     * @param ip : the ip address of the client for audit logging
     * @returns Object : the object of type baseContact
     */
    update = async ( data : baseContact, ip : string, token : string ) => {
        const userId = authUtil.defineId(token);
        await this.get(data.id, token);
        const contact = await this.contactMethods.update(data, userId);
        // await this.contactMethods.createAuditLog({
        //     model : "Contact",
        //     action : "UPDATE",
        //     recordId : data.id,
        //     before : existingContact,
        //     after : contact,
        //     metadata : {
        //         ip : ip
        //     }
        // })

        logActivity.log("Contact updated");

        return contact
    }

    /**
     * 
     * soft deletes a contact record from the db depending on the id
     * 
     * creates an audit log if the contact is available and successfully deleted
     * 
     * logs the activity of deletion being performed
     * 
     * @param id : the id of the record being deleted
     * @param ip : the ip address of the client
     * @returns Object of type baseContact
     */
    delete = async ( id : string, ip : string, token : string ) => {
        await this.get(id, token);
        const userId = authUtil.defineId(token);
        const contact = await this.contactMethods.delete(id, userId);
        if(!contact) throw new serverError(404, "User does not exist");

        // await this.contactMethods.createAuditLog({
        //     model : "Contact",
        //     action : "DELETE",
        //     recordId : id,
        //     before : contact,
        //     after : null,
        //     metadata : {
        //         ip : ip
        //     }
        // })

        logActivity.log("User deleted");

        return contact
    }

    /**
     * 
     * fetches all the contacts which have been soft deleted
     * 
     * logs the activity of fetching deleted contacts
     * 
     * @returns 
     */
    // getDeleted = async () => {
    //     const contacts = await this.contactMethods.getDeleted();
    //     logActivity.log("All deleted contacts fetched");
    //     return contacts;
    // }

}

export { contactPgServicesClass };
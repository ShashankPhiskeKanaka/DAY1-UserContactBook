// import { errorMessages } from "../constants/errorMessages.constants";
// import { prisma } from "../db/prisma";
// import type { baseContact, pageinationData } from "../model/contact.model";
// import type { contactPrismaRepositoryClass } from "../repository/contact/contact.prismarepository";
// import { serverError } from "../utils/error.utils";
// import { logActivity } from "../utils/logging.utils";

// class contactServicesClass {
//     constructor ( private contactMethods : contactPrismaRepositoryClass ) {} // repository class passed in as parameter

//     /**
//      * 
//      * creates a contact
//      * 
//      * intially checks if contact with similar email is available or not and then proceeds
//      * 
//      * logs the creation of new contact
//      * 
//      * @async data 
//      * @returns { Promise<baseContact> } containing id, name, email, phonenumber, address, createdAt
//      */
//     createContact = async ( data : baseContact ) => {

//         // checks if another contact with the specified email exists or not
//         let contact = await this.contactMethods.checkExistence(data.email ?? "");
//         if(contact.email) throw new serverError( errorMessages.EXISTS.status , errorMessages.EXISTS.message );

//         // creates the contact
//         contact = await this.contactMethods.create(data);

//         // logging the activity of contact creation
//         logActivity.log("New user created");

//         return contact;
//     }

//     /**
//      *
//      * fetches the available contacts
//      * 
//      * fetches contacts according the the provided limit, cursor, search, email and sorting order
//      * 
//      * logs the activity of fetching all contacts
//      *  
//      * @param cursor 
//      * @param limit 
//      * @param search 
//      * @param email 
//      * @param sort 
//      * @returns { Promise<pageinationData> } containing contact, nextCursor, hasMoreData
//      */
//     getAll = async ( cursor : string | undefined, limit : number | undefined, search : string | undefined, email : string | undefined, sort : string | undefined ) => {
//         const contacts = await this.contactMethods.getAll(cursor, limit, search, email, sort);
//         logActivity.log("All users fetched");
//         return contacts;
//     }

//     /**
//      * 
//      * fetches a single contact from the db using the id
//      * 
//      * logs the error if no contact is found
//      * 
//      * logs the activity of the contact being fetched if the contact exists
//      * 
//      * @param id : the id of the contact record
//      * @returns Object : the returned value of type baseContact
//      */
//     get = async ( id : string ) => {
//         const contact = await this.contactMethods.get(id);
//         if(!contact.email) throw new serverError(404, "User does not exist");

//         logActivity.log("User fetched using email");

//         return contact
//     }

//     /**
//      * 
//      * updates the contact record according to the id
//      * 
//      * creates and auditlog if the contact is available and successfully updated
//      * 
//      * logs the activity of contact being updated
//      * 
//      * @param data : the data object of type baseContact
//      * @param ip : the ip address of the client for audit logging
//      * @returns Object : the object of type baseContact
//      */
//     update = async ( data : baseContact, ip : string ) => {
//         const existingContact = await this.get(data.id);

//         const contact = await this.contactMethods.update(data);
//         await this.contactMethods.createAuditLog({
//             model : "Contact",
//             action : "UPDATE",
//             recordId : data.id,
//             before : existingContact,
//             after : contact,
//             metadata : {
//                 ip : ip
//             }
//         })

//         logActivity.log("Contact updated");

//         return contact
//     }

//     /**
//      * 
//      * soft deletes a contact record from the db depending on the id
//      * 
//      * creates an audit log if the contact is available and successfully deleted
//      * 
//      * logs the activity of deletion being performed
//      * 
//      * @param id : the id of the record being deleted
//      * @param ip : the ip address of the client
//      * @returns Object of type baseContact
//      */
//     delete = async ( id : string, ip : string ) => {
//         await this.get(id);
//         const contact = await this.contactMethods.delete(id);
//         if(!contact.email) throw new serverError(404, "User does not exist");

//         await this.contactMethods.createAuditLog({
//             model : "Contact",
//             action : "DELETE",
//             recordId : id,
//             before : contact,
//             after : null,
//             metadata : {
//                 ip : ip
//             }
//         })

//         logActivity.log("User deleted");

//         return contact
//     }

//     /**
//      * 
//      * fetches all the contacts which have been soft deleted
//      * 
//      * logs the activity of fetching deleted contacts
//      * 
//      * @returns 
//      */
//     getDeleted = async () => {
//         const contacts = await this.contactMethods.getDeleted();
//         logActivity.log("All deleted contacts fetched");
//         return contacts;
//     }

// }

// export { contactServicesClass };
import type { baseContact } from "../model/contact.model";
import type { userMongoRepositoryClass } from "../repository/user/contact.mongorepository";
import type { contactPrismaRepositoryClass } from "../repository/user/contact.prismarepository";
import { serverError } from "../utils/error.utils";
import { logActivity } from "../utils/logging.utils";

// user service class
// email is used as an unique identifier

class contactServicesClass {
    constructor ( private userMethods : contactPrismaRepositoryClass ) {} // repository class passed in as parameter

    // creates user, checks if user already exists or not and then creates it, returns a baseUser object
    createContact = async ( data : baseContact ) => {
        let contact = await this.userMethods.get(data.email);
        if(contact.email) throw new serverError(400, "User already exists");
        contact = await this.userMethods.create(data);

        logActivity.log("New user created");

        return contact;
    }

    // fetches all users, returns array of baseUsers
    getAll = async () => {
        const contacts = await this.userMethods.getAll();
        logActivity.log("All users fetched");
        return contacts;
    }

    // fetches a single user using email, email is passed on to the repository, returns baseUser object
    get = async ( email : string ) => {
        const contact = await this.userMethods.get(email);
        if(!contact.email) throw new serverError(404, "User does not exist");

        logActivity.log("User fetched using email");

        return contact
    }

    // updates an user using email, data is passed on to the repository, returns baseUser
    update = async ( data : baseContact ) => {
        await this.get(data.email);

        const contact = await this.userMethods.update(data);

        logActivity.log("User updated");

        return contact
    }

    // deletes an user, email is passed on to repository, returns baseUser
    delete = async ( email : string ) => {
        await this.get(email);
        const contact = await this.userMethods.delete(email);
        if(!contact.email) throw new serverError(404, "User does not exist");

        logActivity.log("User deleted");

        return contact
    }

}

export { contactServicesClass };
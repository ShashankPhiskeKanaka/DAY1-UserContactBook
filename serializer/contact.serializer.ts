import type { baseContact } from "../model/contact.model";

/**
 * Serializer class for contacts
 * serialize method for single contacts and serializeAll method for group of contacts
 */
class contactSerializer {

    // serializes a single user
    static serialize ( contact : baseContact ) {
        return {
            id : contact.id,
            name : contact.name,
            phonenumber : contact.phoneNumber,
            email : contact.email,
            address : contact.address,
            createdAt : contact.createdAt,
            ownerId : contact.ownerId
        }
    }

    // serializes all the fetched users
    static serializeAll ( contacts : baseContact[] ) {
        return contacts.map(this.serialize);
    }
}

export { contactSerializer }
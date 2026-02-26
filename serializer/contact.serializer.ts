import type { baseContact } from "../model/contact.model";

// serialized the data that will be sent in response
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
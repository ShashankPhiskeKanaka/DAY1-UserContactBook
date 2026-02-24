import type { baseContact } from "../model/contact.model";

// serialized the data that will be sent in response
class contactSerializer {

    // serializes a single user
    static serialize ( contact : baseContact ) {
        return {
            name : contact.name,
            phonenumber : contact.phonenumber,
            email : contact.email,
            address : contact.address,
            createdAt : contact.createdAt
        }
    }

    // serializes all the fetched users
    static serializeAll ( contacts : baseContact[] ) {
        return contacts.map(this.serialize);
    }
}

export { contactSerializer }
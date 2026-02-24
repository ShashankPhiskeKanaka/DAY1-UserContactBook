import type { baseUser } from "../model/user.model";

// serialized the data that will be sent in response
class userSerializer {

    // serializes a single user
    static serialize ( user : baseUser ) {
        return {
            name : user.name,
            phonenumber : user.phonenumber,
            email : user.email,
            address : user.address,
            createdAt : user.createdAt
        }
    }

    // serializes all the fetched users
    static serializeAll ( users : baseUser[] ) {
        return users.map(this.serialize);
    }
}

export { userSerializer }
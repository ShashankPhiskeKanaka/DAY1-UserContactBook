import type { baseUser } from "../model/user.model.js";

class userSerializer {
    static serialize ( user : baseUser ) {
        return {
            name : user.name,
            phonenumber : user.phonenumber,
            email : user.email,
            address : user.address
        }
    }

    static serializeAll ( users : baseUser[] ) {
        return users.map(this.serialize);
    }
}

export { userSerializer }
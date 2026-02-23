import type { baseUser } from "../model/user.model.js";
import type { userMongoRepositoryClass } from "../repository/user/user.mongorepository.js";
import { serverError } from "../utils/error.utils.js";
import { logActivity } from "../utils/logging.utils.js";

class userServicesClass {
    constructor ( private userMethods : userMongoRepositoryClass ) {}

    createUser = async ( data : baseUser ) => {
        let user = await this.userMethods.get(data.email);
        if(user.email) throw new serverError(400, "The user already exists");

        user = await this.userMethods.create(data);

        logActivity.log("New user created");

        return user
    }

    getAll = async () => {
        const users = await this.userMethods.getAll();
        logActivity.log("All users fetched");
        return users;
    }

    get = async ( email : string ) => {
        const user = await this.userMethods.get(email);
        if(!user.email) throw new serverError(400, "User does not exist");

        logActivity.log("User fetched using email");

        return user
    }

    update = async ( data : baseUser ) => {
        let user = await this.userMethods.get(data.email);
        if(!user.email) throw new serverError(400, "User does not exist");

        user = await this.userMethods.update(data);

        logActivity.log("User updated");

        return user
    }

    delete = async ( email : string ) => {
        const user = await this.userMethods.delete(email);
        if(!user.email) throw new serverError(400, "User does not exist");

        logActivity.log("User deleted");

        return user
    }
}

export { userServicesClass };
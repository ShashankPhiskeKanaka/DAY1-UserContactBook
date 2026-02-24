import type { baseUser } from "../model/user.model";
import type { userMongoRepositoryClass } from "../repository/user/user.mongorepository";
import type { userPrismaRepositoryClass } from "../repository/user/user.prismarepository";
import { serverError } from "../utils/error.utils";
import { logActivity } from "../utils/logging.utils";

// user service class

class userServicesClass {
    constructor ( private userMethods : userPrismaRepositoryClass ) {} // repository class passed in as parameter

    // creates user, checks if user already exists or not and then creates it
    createUser = async ( data : baseUser ) => {
        let user = await this.userMethods.get(data.email);
        if(user.email) throw new serverError(400, "User already exists");
        user = await this.userMethods.create(data);

        logActivity.log("New user created");

        return user
    }

    // fetches all users
    getAll = async () => {
        const users = await this.userMethods.getAll();
        logActivity.log("All users fetched");
        return users;
    }

    // fetches a single user using email
    get = async ( email : string ) => {
        const user = await this.userMethods.get(email);
        if(!user.email) throw new serverError(400, "User does not exist");

        logActivity.log("User fetched using email");

        return user
    }

    // updates an user
    update = async ( data : baseUser ) => {
        await this.get(data.email);

        const user = await this.userMethods.update(data);

        logActivity.log("User updated");

        return user
    }

    // deletes an user
    delete = async ( email : string ) => {
        await this.get(email);
        const user = await this.userMethods.delete(email);
        if(!user.email) throw new serverError(400, "User does not exist");

        logActivity.log("User deleted");

        return user
    }

}

export { userServicesClass };
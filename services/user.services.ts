import type { baseUser } from "../model/user.model";
import type { userMongoRepositoryClass } from "../repository/user/user.mongorepository";
import type { userPrismaRepositoryClass } from "../repository/user/user.prismarepository";
import { serverError } from "../utils/error.utils";
import { logActivity } from "../utils/logging.utils";

class userServicesClass {
    constructor ( private userMethods : userPrismaRepositoryClass ) {}

    createUser = async ( data : baseUser ) => {
        this.checkExistence(data.email)

        const user = await this.userMethods.create(data);

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
        this.checkExistence(data.email);

        const user = await this.userMethods.update(data);

        logActivity.log("User updated");

        return user
    }

    delete = async ( email : string ) => {
        this.checkExistence(email);
        const user = await this.userMethods.delete(email);
        if(!user.email) throw new serverError(400, "User does not exist");

        logActivity.log("User deleted");

        return user
    }

    checkExistence = async ( email : string) => {
        let user = await this.userMethods.get(email);
        if(!user.email) throw new serverError(400, "User does not exist");
        return;
    }
}

export { userServicesClass };
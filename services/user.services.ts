import type { userPgRepositoryClass } from "../repository/user/user.pgrepository";
import { authUtil } from "../utils/auth.utils";
import { serverError } from "../utils/error.utils";

class userServicesClass {
    constructor ( private userMethods : userPgRepositoryClass ) {};

    create = async (name : string, password : string, role : string) => {
        const hashedPass = await authUtil.hashPass(password);
        const existing = await this.userMethods.get(name);
        if(existing) throw new serverError(400, "User already exists");
        if(!role) {
            role = "user"
        }
        const user = await this.userMethods.register(name, hashedPass, role);
        return user;
    }

    delete = async ( token : string ) => {
        const { id, role } = authUtil.decodeToken(token);
        let user = await this.userMethods.getById(id);
        if(!user) throw new serverError(400, "User does not exist");
        user = await this.userMethods.delete(id);
        return user;
    }
}

export { userServicesClass };
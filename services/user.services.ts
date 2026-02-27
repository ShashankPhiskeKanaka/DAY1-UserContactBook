import type { userPgRepositoryClass } from "../repository/user/user.pgrepository";
import { authUtil } from "../utils/auth.utils";
import { serverError } from "../utils/error.utils";

class userServicesClass {
    constructor ( private userMethods : userPgRepositoryClass ) {};

    /**
     * Orchestrates the user creation process
     * 
     * @param name 
     * @param password 
     * @param role 
     * @returns 
     */
    create = async (name : string, password : string, role : string) => {
        const roles = ["admin", "user"]
        // hands over the normal password to the hashPass module from authUtil and takes a hashed Password
        const hashedPass = await authUtil.hashPass(password);
        // uses the get method from user repository to check if the user already exists with the name
        const existing = await this.userMethods.get(name);
        if(existing) throw new serverError(400, "User already exists");
        // if no role provided then defines a default "user" role
        if(!role || !roles.includes(role)) {
            role = "user"
        }
        // finally hands over the data to the register methods from user repository to create the user
        const user = await this.userMethods.register(name, hashedPass, role);
        // returns the created user back to the controller
        return user;
    }

    /**
     * Orchestrates the deletion process of the user
     * 
     * @param token 
     * @returns 
     */
    delete = async ( token : string ) => {
        // hands over the token from the cookies to the decodeToken module from authUtil and takes extracted id and role
        const { id, role } = authUtil.decodeToken(token);
        // uses the getById method from user repository to check if the user with the specified id exists or not
        let user = await this.userMethods.getById(id);
        if(!user) throw new serverError(400, "User does not exist");
        // finally provides the id to the delete methods from the user repository which soft deletes the user
        user = await this.userMethods.delete(id);
        // returns the soft deleted user back to the controller
        return user;
    }
}

// exporting the service class to be used in the factory
export { userServicesClass };
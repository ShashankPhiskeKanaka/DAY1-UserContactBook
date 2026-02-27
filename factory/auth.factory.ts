import { authControllerClass } from "../controller/auth.controller";
import { tokenPgRepositoryClass } from "../repository/token/token.pgrepository";
import { userPgRepositoryClass } from "../repository/user/user.pgrepository";
import { authServicesClass } from "../services/auth.services";
import { userServicesClass } from "../services/user.services";

class authFactory {
    /**
     * Creates a authController instance
     * creates instances of the service and repository layers and passes them as parameters into the controller to create the instance
     * @returns instace of auth controller
     */
    static create() {
        const repo = new userPgRepositoryClass();
        const tokenRepo = new tokenPgRepositoryClass();
        const authServices = new authServicesClass(repo, tokenRepo);
        const authController = new authControllerClass(authServices);

        return authController;
    }

    /**
     * Creates repository layer instance of tokens
     * @returns the instance of tokens repository layer
     */
    static createTokenRepo() {
        const repo = new tokenPgRepositoryClass();
        return repo;
    }
}

export { authFactory };
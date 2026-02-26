import { authControllerClass } from "../controller/auth.controller";
import { tokenPgRepositoryClass } from "../repository/token/token.pgrepository";
import { userPgRepositoryClass } from "../repository/user/user.pgrepository";
import { authServicesClass } from "../services/auth.services";
import { userServicesClass } from "../services/user.services";

class authFactory {
    static create() {
        const repo = new userPgRepositoryClass();
        const tokenRepo = new tokenPgRepositoryClass();
        const authServices = new authServicesClass(repo, tokenRepo);
        const authController = new authControllerClass(authServices);

        return authController;
    }

    static createTokenRepo() {
        const repo = new tokenPgRepositoryClass();
        return repo;
    }
}

export { authFactory };
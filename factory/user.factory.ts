import { userControllerClass } from "../controller/user.controller";
import { userPgRepositoryClass } from "../repository/user/user.pgrepository";
import { userServicesClass } from "../services/user.services";

class userFactory{
    static create () {
        const repo = new userPgRepositoryClass();
        const service = new userServicesClass(repo);
        const controller = new userControllerClass(service);

        return controller;
    }
}

export { userFactory };
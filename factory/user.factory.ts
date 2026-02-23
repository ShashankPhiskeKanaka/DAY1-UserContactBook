import { userControllerClass } from "../controller/user.controller.js";
import { userMongoRepositoryClass } from "../repository/user/user.mongorepository.js";
import { userServicesClass } from "../services/user.services.js";

class userFactory {
    static create () {
        const userRepo = new userMongoRepositoryClass();
        const userService = new userServicesClass(userRepo);
        const userConroller = new userControllerClass(userService);

        return userConroller;
    }
}

export { userFactory };
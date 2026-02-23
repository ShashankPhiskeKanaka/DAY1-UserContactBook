import { userControllerClass } from "../controller/user.controller";
import { userMongoRepositoryClass } from "../repository/user/user.mongorepository";
import { userServicesClass } from "../services/user.services";

class userFactory {
    static create () {
        const userRepo = new userMongoRepositoryClass();
        const userService = new userServicesClass(userRepo);
        const userConroller = new userControllerClass(userService);

        return userConroller;
    }
}

export { userFactory };
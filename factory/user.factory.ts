import { userControllerClass } from "../controller/user.controller";
import { userMongoRepositoryClass } from "../repository/user/user.mongorepository";
import { userPrismaRepositoryClass } from "../repository/user/user.prismarepository";
import { userServicesClass } from "../services/user.services";

class userFactory {
    static create () {
        const userRepo = new userPrismaRepositoryClass();

        const userService = new userServicesClass(userRepo);
        const userConroller = new userControllerClass(userService);

        return userConroller;
    }
}

export { userFactory };
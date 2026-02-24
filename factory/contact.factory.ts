import { contactControllerClass } from "../controller/contact.controller";
import { userMongoRepositoryClass } from "../repository/user/contact.mongorepository";
import { contactPrismaRepositoryClass } from "../repository/user/contact.prismarepository";
import { contactServicesClass } from "../services/contact.services";

// generates instances of all the layers of user
class contactFactory {
    static create () {
        const repo = new contactPrismaRepositoryClass();

        const service = new contactServicesClass(repo);
        const contactController = new contactControllerClass(service);

        return contactController;
    }
}

export { contactFactory};
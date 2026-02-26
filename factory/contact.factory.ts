import { contactControllerClass } from "../controller/contact.controller";
import { contactPgRepositoryClass } from "../repository/contact/contact.pgrepository";
// import { contactPrismaRepositoryClass } from "../repository/contact/contact.prismarepository";
import { contactPgServicesClass } from "../services/contact.pgservices";

// generates instances of all the layers of user
class contactFactory {
    static create () {
        // const repo = new contactPrismaRepositoryClass();
        const pgrepo = new contactPgRepositoryClass();

        // const service = new contactServicesClass(repo);
        const pgservice = new contactPgServicesClass(pgrepo);

        const contactController = new contactControllerClass(pgservice);

        return contactController;
    }
}

export { contactFactory};
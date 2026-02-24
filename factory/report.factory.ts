import { reportControllerClass } from "../controller/report.controller";
import { contactPrismaRepositoryClass } from "../repository/user/contact.prismarepository";
import { reportServicesClass } from "../services/report.services";

class reportFactory {
    static create() {
        const repo = new contactPrismaRepositoryClass();
        const service = new reportServicesClass(repo);

        const controller = new reportControllerClass(service);

        return controller;
    }
}

export { reportFactory };
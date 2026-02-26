import { reportControllerClass } from "../controller/report.controller";
// import { contactPrismaRepositoryClass } from "../repository/contact/contact.prismarepository";
import { reportsPrismaRepositoryClass } from "../repository/reports/reports.prismarepository";
import { reportServicesClass } from "../services/report.services";

class reportFactory {
    static create() {
        const repo = new reportsPrismaRepositoryClass();
        const service = new reportServicesClass(repo);

        const controller = new reportControllerClass(service);

        return controller;
    }
}

export { reportFactory };
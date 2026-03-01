import { fileControllerClass } from "../controller/file.controller";
import { filePgRepositoryClass } from "../repository/file/file.pgrepository";
import { fileServicesClass } from "../services/file.services";

class fileFactory {
    static create() {
        const repo = new filePgRepositoryClass();
        const service = new fileServicesClass(repo);
        const controller = new fileControllerClass(service);

        return controller;
    }
}

export { fileFactory };
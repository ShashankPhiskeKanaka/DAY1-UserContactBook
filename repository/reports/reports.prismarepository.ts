import { prisma } from "../../db/prisma";
import type { baseContact } from "../../model/contact.model";
import { reportsMethodsClass } from "./reports.methods";

class reportsPrismaRepositoryClass extends reportsMethodsClass {
    get = async () : Promise<baseContact[]> => {
        const contacts = prisma.contact.findMany();
        return contacts;
    }
}

export { reportsPrismaRepositoryClass }
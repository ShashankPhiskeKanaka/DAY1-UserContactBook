import type { contactPrismaRepositoryClass } from "../repository/user/contact.prismarepository";
import { extractDomain, findMostCommonDomain } from "../utils/report.utils";

class reportServicesClass {
    constructor ( private userMethods : contactPrismaRepositoryClass ) {}
    
    report = async () => {
        const date = new Date()
        const day = date.getDay();

        const contacts = await this.userMethods.getAll();
        const contactsAddedToday = contacts.filter((c) => c.createdAt.getDay() == day);
        const domains = contacts.map((c) => extractDomain(c.email));

        const { maxCount, mostCommon } = findMostCommonDomain(domains);

        return {
            totalContacts : contacts.length,
            totalContactsAddedToday : contactsAddedToday.length,
            contactsAddedToday : contactsAddedToday,
            mostCommonDomain : mostCommon,
            countOfMostCommonDomain : maxCount
        }

    }

}

export { reportServicesClass }
import type { contactPrismaRepositoryClass } from "../repository/contact/contact.prismarepository";
import type { reportsPrismaRepositoryClass } from "../repository/reports/reports.prismarepository";
import { logActivity } from "../utils/logging.utils";
import { extractDomain, findMostCommonDomain } from "../utils/report.utils";

class reportServicesClass {
    constructor ( private reportMethods : reportsPrismaRepositoryClass ) {}
    
    report = async () => {
        const date = new Date()
        const day = date.getDay();

        const contacts = await this.reportMethods.get();
        const contactsAddedToday = contacts.filter((c) => c.createdAt.getDay() == day);
        const domains = contacts.map((c) => extractDomain(c.email));

        const { maxCount, mostCommon } = findMostCommonDomain(domains);

        logActivity.log("Contacts report generated");

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
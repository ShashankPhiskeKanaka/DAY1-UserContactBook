import type { reportsPrismaRepositoryClass } from "../repository/reports/reports.prismarepository";
import { logActivity } from "../utils/logging.utils";
import { extractDomain, findMostCommonDomain } from "../utils/report.utils";

class reportServicesClass {
    constructor ( private reportMethods : reportsPrismaRepositoryClass ) {}
    
    /**
     * Generates a summary report of contacts data
     * 
     * Fetches all contacts to calculate their count, daily growth and identify the most common domain
     * 
     * @async
     * @returns { Promise<Object> } containing totalContacts, totalContactsAddedToday, contactsAddedToday, mostCommonDomain, countOfMostCommonDomain
     */

    report = async () => {
        const date = new Date()
        const day = date.getDay();

        // fetching all the contacts
        const data = await this.reportMethods.get();
        // identifying the contacts created today
        // const contactsAddedToday = contacts.filter((c) => c.createdAt.getDay() == day);
        // // extracting the domains
        // const domains = contacts.map((c) => extractDomain(c.email ?? ""));

        // // determining the most common domain along with its count
        // const { maxCount, mostCommon } = findMostCommonDomain(domains);

        // logging the activity
        logActivity.log("Contacts report generated");

        return {
                contactsAddedToday : data.contactsAddedToday,
                totalContacts : data.totalContacts,
                mostCommonDomain : data.mostCommonDomain,
                domainCount : data.domainCount,
                totalDeletedContacts : data.totalDeletedContacts
        }

    }

}

export { reportServicesClass }
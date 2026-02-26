import type { reportsPrismaRepositoryClass } from "../repository/reports/reports.prismarepository";
import { authUtil } from "../utils/auth.utils";
import { serverError } from "../utils/error.utils";
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

    report = async (token : string) => {
        const { id, role } = authUtil.decodeToken(token)
        if(role != "admin") throw new serverError(400, "Unauthrorized");
        const data = await this.reportMethods.get();
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
// import { prisma } from "../../db/prisma";
import { pool } from "../../db/postgres";
import type { baseContact } from "../../model/contact.model";
import { reportsMethodsClass } from "./reports.methods";

/**
 * Reports repository which used postgres by using the pool from the pg-node module
 * extends the reports abstract methods class for the necessary methods
 */
class reportsPrismaRepositoryClass extends reportsMethodsClass {
    /**
     * Generates a report by fetching all the contacts from the db
     * 
     * @returns 
     */
    get = async () : Promise<any> => {
        /**
         * SQL query :
         * generates count of total contacts added today, total active contact, total deleted contacts, most common domain and its count
         */
        const query = 
            `WITH "todayStats" AS (
                SELECT COUNT (*) as "addedToday"
                FROM contact
                WHERE "createdAt"::date = CURRENT_DATE AND "deletedAt" IS NULL
            ),
            "totalStats" AS (
                SELECT COUNT (*) as "totalActiveContacts"
                FROM contact
                WHERE "deletedAt" IS NULL
            ),
            "totalDeleted" AS (
                SELECT COUNT (*) as "deletedContacts"
                FROM contact
                WHERE "deletedAt" IS NOT NULL
            ),
            "domainList" AS (
                SELECT SUBSTRING (email from '@(.*)$') as domain
                FROM contact
                WHERE email IS NOT NULL AND "deletedAt" IS NULL
            )
            SELECT
                (SELECT "addedToday" FROM "todayStats") as "contactsAddedToday",
                (SELECT "totalActiveContacts" FROM "totalStats") as "totalContacts",
                (SELECT "deletedContacts" FROM "totalDeleted") as "totalDeletedContacts",
                domain as "mostCommonDomain",
                COUNT (*) as "domainCount"
            FROM "domainList"
            GROUP BY domain
            ORDER BY "domainCount" DESC
            LIMIT 1;`;
        
        // executes the query using the pool
        const { rows } = await pool.query(query);
        // returns default values to the service layer if not data is found
        if(rows.length == 0){
            return {
                contactsAddedToday : 0,
                totalContacts : 0,
                mostCommonDomain : "NA",
                domainCount : 0,
                totalDeletedContacts : 0
            }
        }
        // returns the generated report back to the report service layer
        return rows[0];
    }
}

export { reportsPrismaRepositoryClass }
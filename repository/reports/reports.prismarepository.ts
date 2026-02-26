// import { prisma } from "../../db/prisma";
import { pool } from "../../db/postgres";
import type { baseContact } from "../../model/contact.model";
import { reportsMethodsClass } from "./reports.methods";

class reportsPrismaRepositoryClass extends reportsMethodsClass {
    get = async () : Promise<any> => {
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
        
        const { rows } = await pool.query(query);
        console.log(rows);
        if(rows.length == 0){
            return {
                contactsAddedToday : 0,
                totalContacts : 0,
                mostCommonDomain : "NA",
                domainCount : 0,
                totalDeletedContacts : 0
            }
        }

        return rows[0];
    }
}

export { reportsPrismaRepositoryClass }
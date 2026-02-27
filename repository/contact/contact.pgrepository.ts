import { pool } from "../../db/postgres";
import type { baseContact } from "../../model/contact.model";
import { contactMethodsClass } from "./contact.methods";

/**
 * Repository class for contacts which uses the postgres db using pg-node module by accessing a pool
 */
class contactPgRepositoryClass extends contactMethodsClass {
    /**
     * Creates a new contact in the db
     * 
     * @param data 
     * @param userId 
     * @returns 
     */
    create = async (data : baseContact, userId : string | undefined) : Promise<baseContact> => {
        /**
         * SQL query :
         * Inserts the data into the contact table
         * uses parameterized queries to prevent sql injection
         */
        const query = `INSERT INTO contact(name, email, "phoneNumber", address, "ownerId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [data.name, data.email, data.phoneNumber, data.address, userId]
        // executes the query along with values using pool
        const res = await pool.query(query, values);
        // returns the created contact back to the service layer
        return res.rows[0];
    }

    /**
     * Deletes the contact from the db
     * 
     * @param id 
     * @param userId 
     * @returns 
     */
    delete = async (id : string, userId : string | undefined) : Promise<baseContact> => {
        /**
         * SQL query :
         * Performs update operation to soft the delete the contact
         * adds current timestamp to the deletedAt field
         * uses parameterized queries to prevent sql injection
         */
        const query = `UPDATE contact SET "deletedAt" = NOW() WHERE (id = $1) RETURNING *`;
        const values = [id, userId];
        // executes the query along with the values
        const res = await pool.query(query, values);
        // returns the soft deleted contact from the db back to the service layer
        return res.rows[0];
    }

    /**
     * Fetches a contact from the db
     * 
     * @param id 
     * @param userId 
     * @returns 
     */
    get = async (id : string, userId : string | undefined) : Promise<baseContact> => {
        /**
         * SQL query :
         * Fetches a contact using the id and the ownerId and checks for the soft delete field
         * uses parameterized query to prevent sql injection
         */
        const query = `SELECT * FROM contact WHERE id = $1 AND ("deletedAt" IS NULL) AND ($2::uuid IS NULL OR "ownerId" = $2)`;
        const values = [id, userId];
        // executes the query along with the values using the pool
        const res = await pool.query(query, values);
        // returns the fetched contact from the db back to the service layer
        return res.rows[0];
    }

    /**
     * Fetches all the contacts from the db
     * 
     * @param limit 
     * @param search 
     * @param sort 
     * @param lastCreatedAt 
     * @param lastId 
     * @param userId 
     * @returns 
     */
    getAll = async (limit : number | undefined, search : string | undefined, sort : string | undefined, lastCreatedAt : string | undefined, lastId : string | undefined, userId : string | undefined) : Promise<baseContact[]> => {
        // defining a search pattern string for email or name
        const searchPattern = `%${search}%`;
        
        // defines a query based on of cursor values of createdAt and id are given
        /**
         * SQL query :
         * performs sorting, searching, pagination on the contacts and checks if the provided contacts are of the user or not
         * uses parameterized query to prevent sql injection
         */
        let query;
        let values;
        console.log(userId);
        if (!lastCreatedAt || !lastId) {
            // --- Page 1 (No cursor) ---
            query = `
            SELECT * FROM contact 
            WHERE (name ILIKE $1 OR email ILIKE $1) AND ("deletedAt" IS NULL) AND ( $3::uuid IS NULL OR "ownerId" = $3 )
            ORDER BY "createdAt" ${sort}
            LIMIT $2
            `;
            values = [searchPattern, limit, userId];
        } else {
            // --- Page 2+ (With cursor) ---
            query = `
            SELECT * FROM contact 
            WHERE (name ILIKE $1 OR email ILIKE $1)
                AND ("createdAt", id) < ($2, $3)  AND ("deletedAt" IS NULL) AND ( $5::uuid IS NULL OR "ownerId" = $5 )
            ORDER BY "createdAt" ${sort}
            LIMIT $4
            `;
            values = [searchPattern, lastCreatedAt, lastId, limit, userId];
        }
        // executes the query along with the values using the pool
        const res = await pool.query(query, values);
        // returns the fetched contacts from the db back to the service layer
        return res.rows;
    }

    /**
     * Updates the contact in the db
     * 
     * @param data 
     * @param userId 
     * @returns 
     */
    update = async (data : baseContact, userId : string | undefined) : Promise<baseContact> => {
        /**
         * SQL query :
         * Updates the phoneNumber, name, email and address of the contact based on the provided id and performs a soft delete check
         * uses parameterized query to prevent sql injection
         */
        const query = `UPDATE contact SET phoneNumber = $1, name = $2, email = $3, address = $4 WHERE (id = $5) AND ("deletedAt IS NULL") AND ($6::uuid IS NULL OR "ownerId" = $6)`;
        const values = [data.phoneNumber, data.name, data.email, data.address, data.id, userId];
        // executes the query along with the values using the pool
        const res = await pool.query(query, values);
        // returns the updated contact back to the contact service layer
        return res.rows[0];
    }

    /**
     * Checks if a contact with the same name, phoneNumber, email and userId exists or not
     * 
     * @param name 
     * @param email 
     * @param phoneNumber 
     * @param id 
     * @returns 
     */
    checkExistence = async ( name : string, email : string | null, phoneNumber : string | null, id : string ) : Promise<baseContact> => {
        /**
         * SQL query :
         * fetches a contact from the db by checking the contact name, phoneNumber, email and userId
         * performs a check on soft delete
         */
        const query = `SELECT * FROM contact WHERE name = $1 AND ("phoneNumber" IS NOT DISTINCT FROM $2) AND (email IS NOT DISTINCT FROM $3) AND ( "ownerId" = $4 ) AND ("deletedAt" IS NULL)`
        const values = [name, phoneNumber, email, id]
        // executes the query along with the values using the pool
        const res = await pool.query(query, values);
        // returns the contact to the contact service layer
        return res.rows[0];
    }
}

export { contactPgRepositoryClass }
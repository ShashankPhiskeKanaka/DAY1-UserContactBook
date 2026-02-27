import { pool } from "../../db/postgres";
import { userMethodsClass, type baseUser } from "./user.methods";

class userPgRepositoryClass extends userMethodsClass {

    /**
     * Creates a new user in the db
     * @param name
     * @param password 
     * @param role 
     * @returns 
     */
    register = async ( name : string, password : string, role : string ) : Promise<baseUser> => {
        /**
         * SQL query :
         * Inserts the provided information name, password and role into the users table
         */
        const query = `
            INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *
        `;
        const values = [name, password, role];
        // executes the query via pool
        const res = await pool.query(query, values);
        // returns the inserted user
        return res.rows[0];
    }

    /**
     * fetches a single user from the db using their name
     * 
     * @param name 
     * @returns 
     */

    get = async ( name : string ) : Promise<baseUser> => {
        /**
         * SQL query :
         * Used parameterized queries to pervent sql injection
         * Performs a soft delete check on deletedAt
         */
        const query = `
            SELECT * FROM users WHERE name = $1 AND ( "deletedAt" IS NULL )
        `;
        const values = [name];
        // executes the query via pool
        const res = await pool.query(query, values);

        // returns the first row found
        return res.rows[0];
    }

    /**
     * Fetches single user from the table using the uuid
     * 
     * @param id 
     * @returns 
     */

    getById = async ( id : string ) : Promise<baseUser> => {
        /**
         * SQL query :
         * Used parameterized queries to prevent sql injection
         * performs a soft delete check on deletedAt
         */
        const query = `
            SELECT * FROM users WHERE id = $1 AND ( "deletedAt" IS NULL )
        `;
        const values = [id];
        // executes the query via pool
        const res = await pool.query(query, values);
        // returns the first row found
        return res.rows[0];
    }

    /**
     * 
     * Updates the password of the user 
     * 
     * @param id 
     * @param password 
     * @returns 
     */

    update = async ( id : string, password : string ) : Promise<baseUser> => {
        /**
         * SQL query :
         * Used parameterized queries to prevent sql injection
         * matches the user according to the uuid and performs a soft delete check on deletedAt
         */
        const query = `
            UPDATE users SET password = $1 WHERE (id = $2) AND ("deletedAt" IS NULL) RETURNING *
        `;
        const values = [password, id];
        // executes the query via pool
        const res = await pool.query(query, values);
        // returns the updated user
        return res.rows[0];
    }

    /**
     * Soft deletes the user from the table
     * 
     * @param id 
     * @returns 
     */

    delete = async ( id : string ) => {
        /**
         * SQL query
         * Updates the value for deletedAt to current datetime and matches the user according to the uuid
         * performs a soft deleted check on deletedAt
         */
        const query = `
            UPDATE users SET "deletedAt" = NOW() where (id = $1) AND ("deletedAt" IS NULL) RETURNING *
        `;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }
}

export { userPgRepositoryClass }
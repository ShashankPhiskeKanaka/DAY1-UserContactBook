import { pool } from "../../db/postgres";
import type { baseContact } from "../../model/contact.model";
import { contactMethodsClass } from "./contact.methods";

class contactPgRepositoryClass extends contactMethodsClass {
    create = async (data : baseContact) : Promise<baseContact> => {
        const query = `INSERT INTO contact(name, email, "phoneNumber", address) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [data.name, data.email, data.phoneNumber, data.address]
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    delete = async (id : string) : Promise<baseContact> => {
        const query = `UPDATE contact SET "deletedAt" = NOW() WHERE (id = $1) RETURNING *`;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    get = async (id : string) : Promise<baseContact> => {
        const query = `SELECT * FROM contact WHERE id = $1 AND ("deletedAt" IS NULL)`;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    getAll = async (limit : number | undefined, search : string | undefined, sort : string | undefined, lastCreatedAt : string | undefined, lastId : string | undefined) : Promise<baseContact[]> => {
        const searchPattern = `%${search}%`;
        
        let query;
        let values;
        if (!lastCreatedAt || !lastId) {
            // --- Page 1 (No cursor) ---
            query = `
            SELECT * FROM contact 
            WHERE (name ILIKE $1 OR email ILIKE $1) AND ("deletedAt" IS NULL)
            ORDER BY "createdAt" ${sort}
            LIMIT $2
            `;
            values = [searchPattern, limit];
        } else {
            // --- Page 2+ (With cursor) ---
            query = `
            SELECT * FROM contact 
            WHERE (name ILIKE $1 OR email ILIKE $1)
                AND ("createdAt", id) < ($2, $3)  AND ("deletedAt" IS NULL)
            ORDER BY "createdAt" ${sort}
            LIMIT $4
            `;
            values = [searchPattern, lastCreatedAt, lastId, limit];
        }
        const res = await pool.query(query, values);
        return res.rows;
    }

    update = async (data : baseContact) : Promise<baseContact> => {
        const query = `UPDATE contact SET phoneNumber = $1, name = $2, email = $3, address = $4 WHERE (id = $5) AND ("deletedAt IS NULL")`;
        const values = [data.phoneNumber, data.name, data.email, data.address, data.id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    checkExistence = async ( name : string, email : string | null, phoneNumber : string | null ) : Promise<baseContact> => {
        const query = `SELECT * FROM contact WHERE name = $1 AND ("phoneNumber" IS NOT DISTINCT FROM $2) AND (email IS NOT DISTINCT FROM $3)`
        const values = [name, phoneNumber, email]
        const res = await pool.query(query, values);
        return res.rows[0];
    }
}

export { contactPgRepositoryClass }
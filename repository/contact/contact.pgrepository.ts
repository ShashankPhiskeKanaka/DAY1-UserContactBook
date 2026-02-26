import { pool } from "../../db/postgres";
import type { baseContact } from "../../model/contact.model";
import { contactMethodsClass } from "./contact.methods";

class contactPgRepositoryClass extends contactMethodsClass {
    create = async (data : baseContact, userId : string | undefined) : Promise<baseContact> => {
        const query = `INSERT INTO contact(name, email, "phoneNumber", address, "ownerId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [data.name, data.email, data.phoneNumber, data.address, userId]
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    delete = async (id : string, userId : string | undefined) : Promise<baseContact> => {
        const query = `UPDATE contact SET "deletedAt" = NOW() WHERE (id = $1) RETURNING *`;
        const values = [id, userId];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    get = async (id : string, userId : string | undefined) : Promise<baseContact> => {
        const query = `SELECT * FROM contact WHERE id = $1 AND ("deletedAt" IS NULL) AND ($2::uuid IS NULL OR "ownerId" = $2)`;
        const values = [id, userId];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    getAll = async (limit : number | undefined, search : string | undefined, sort : string | undefined, lastCreatedAt : string | undefined, lastId : string | undefined, userId : string | undefined) : Promise<baseContact[]> => {
        const searchPattern = `%${search}%`;
        
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
        const res = await pool.query(query, values);
        return res.rows;
    }

    update = async (data : baseContact, userId : string | undefined) : Promise<baseContact> => {
        const query = `UPDATE contact SET phoneNumber = $1, name = $2, email = $3, address = $4 WHERE (id = $5) AND ("deletedAt IS NULL") AND ($6::uuid IS NULL OR "ownerId" = $6)`;
        const values = [data.phoneNumber, data.name, data.email, data.address, data.id, userId];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    checkExistence = async ( name : string, email : string | null, phoneNumber : string | null, id : string ) : Promise<baseContact> => {
        const query = `SELECT * FROM contact WHERE name = $1 AND ("phoneNumber" IS NOT DISTINCT FROM $2) AND (email IS NOT DISTINCT FROM $3) AND ( "ownerId" = $4 )`
        const values = [name, phoneNumber, email, id]
        const res = await pool.query(query, values);
        return res.rows[0];
    }
}

export { contactPgRepositoryClass }
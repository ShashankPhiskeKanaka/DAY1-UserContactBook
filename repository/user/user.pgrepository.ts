import { pool } from "../../db/postgres";
import { userMethodsClass, type baseUser } from "./user.methods";

class userPgRepositoryClass extends userMethodsClass {
    register = async ( name : string, password : string, role : string ) : Promise<baseUser> => {
        const query = `
            INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *
        `;
        const values = [name, password, role];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    get = async ( name : string ) : Promise<baseUser> => {
        const query = `
            SELECT * FROM users WHERE name = $1 AND ( "deletedAt" IS NULL )
        `;
        const values = [name];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    getById = async ( id : string ) : Promise<baseUser> => {
        const query = `
            SELECT * FROM users WHERE id = $1 AND ( "deletedAt" IS NULL )
        `;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    update = async ( id : string, password : string ) : Promise<baseUser> => {
        const query = `
            UPDATE users SET password = $1 WHERE (id = $2) AND ("deletedAt" IS NULL) RETURNING *
        `;
        const values = [password, id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    delete = async ( id : string ) => {
        console.log(id);
        const query = `
            UPDATE users SET "deletedAt" = NOW() where (id = $1) AND ("deletedAt" IS NULL) RETURNING *
        `;
        const values = [id];
        const res = await pool.query(query, values);
        return res.rows[0];
    }
}

export { userPgRepositoryClass }
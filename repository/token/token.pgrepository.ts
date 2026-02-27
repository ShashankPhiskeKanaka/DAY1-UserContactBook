import { pool } from "../../db/postgres";
import { serverError } from "../../utils/error.utils";
import { authUtil } from "../../utils/auth.utils";
import crypto from "crypto"

interface refreshTokenData {
    id? : string,
    userId? : string,
    token? : string,
    expiresAt? : Date,
    familyId? : string,
    isUsed? : boolean
}
/**
 * Token repository, uses postgres as db via pool from pg-node package
 * 
 */

class tokenPgRepositoryClass {
    /**
     * Creates a refreshToken
     * 
     * @param userId 
     * @param role 
     * @returns 
     */
    create = async (userId : string, role : string) => {
        // generating a familyId
        const familyId = crypto.randomUUID();
        // expiresAt value
        const expiresAt = new Date();
        // generating a random token to be used as a refresh token
        const refreshToken = crypto.randomBytes(40).toString("hex");
        // setting the expiration date to 7days
        expiresAt.setDate(expiresAt.getDate() + 7);

        /**
         * SQL query :
         * creates a new refresh token
         * uses parameterized query to prevent injection attacks
         */
        const query = `
            INSERT INTO "refreshTokens" ( "userId", token, "expiresAt", "familyId" ) values ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [ userId, refreshToken, expiresAt, familyId ];
        // executes the query along with the values using the pool
        const res = await pool.query(query, values);
        // generates a new access token for the client
        const token = authUtil.generateToken(userId, role);
        // sends back the refreshToken and the access token back to the auth service layer
        return { token, refreshToken }
    }

    createRefreshToken = async ( token : string, id : string, role : string ) => {
        let query = `
            SELECT * FROM "refreshTokens" WHERE token = $1
        `;
        let values = [token];
        const res = await pool.query(query, values);
        const tokenData = res.rows[0];

        if(!tokenData || tokenData.isUsed || new Date() > tokenData.expiresAt) {
            if(tokenData.isUsed) {
                await pool.query(`DELETE FROM "refreshTokens" WHERE familyId = $1`, [tokenData.familyId]);
            }
            throw new serverError(400, "Invalid token please login again");
        }

        await pool.query(`UPDATE "refreshTokens" SET "isUsed" = true WHERE id = $1`, [tokenData.id]);
        const newToken = authUtil.generateToken(id, role);
        const newRefreshToken = crypto.randomBytes(40).toString("hex");
        
        await pool.query(
            `INSERT INTO "refreshTokens" ("userId", token, "expiresAt", "familyId") values ($1, $2, $3, $4)`,
            [tokenData.userId, newRefreshToken, new Date(Date.now() + 7*24*60*60*1000)]
        );

        return { newToken, newRefreshToken };   
    }

    get = async (token : string) : Promise<any> => {
        const res = await pool.query(`SELECT * FROM "refreshTokens" WHERE ( token = $1 )`, [token]);
        return res.rows[0];
    }

    deleteRefreshTokenUser = async (id : string) => {
        await pool.query(`DELETE FROM "refreshTokens" WHERE "userId" = $1`, [id]);
        return;
    }

    deleteRefreshTokenFamily = async (id : string) => {
        await pool.query(`DELETE FROM "refreshTokens" WHERE "familyId" = $1`, [id]);
        return;
    }
}

export { tokenPgRepositoryClass };
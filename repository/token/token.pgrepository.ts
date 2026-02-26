import { pool } from "../../db/postgres";
import { serverError } from "../../utils/error.utils";
import { authUtil } from "../../utils/auth.utils";
import crypto from "crypto"

class tokenPgRepositoryClass {
    create = async (userId : string, role : string) => {
        const familyId = crypto.randomUUID();
        const expiresAt = new Date();
        const refreshToken = crypto.randomBytes(40).toString("hex");
        expiresAt.setDate(expiresAt.getDate() + 7);

        const query = `
            INSERT INTO "refreshTokens" ( "userId", token, "expiresAt", "familyId" ) values ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [ userId, refreshToken, expiresAt, familyId ];
        const res = await pool.query(query, values);
        const token = authUtil.generateToken(userId, role);
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
        const refreshToken = await pool.query(`SELECT * FROM "refreshTokens" WHERE ( token = $1 )`, [token]);
        return refreshToken;
    }

    deleteRefreshToken = async (familyId : string) => {
        await pool.query(`DELETE FROM "refreshTokens" WHERE familyId = $1`, [familyId]);
        return;
    }
}

export { tokenPgRepositoryClass };
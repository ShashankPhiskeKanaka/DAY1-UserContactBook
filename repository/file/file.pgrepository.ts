import { uuidv4 } from "zod"
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config/env";
import { pool } from "../../db/postgres";
import crypto from "crypto"

class filePgRepositoryClass {

    generateUploadSignature = async (data : any) => {
        const storedId = crypto.randomBytes(40).toString("hex");
        const folderPath = `users/${data.userId}/uploads`
        const timestamp = Math.round(new Date().getTime()/1000);
        const paramsToSign = {
            timestamp : timestamp,
            folder : folderPath,
            public_id : storedId,
            source : 'uw'
        }

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            config.file_api_secret
        )

        await pool.query(
            `INSERT INTO files ("userId", name, "storedId", status, size, "fileType") VALUES ($1, $2, $3, $4, $5, $6)`,
            [data.userId, data.fileName, storedId, 'pending', 0, 'unknown']
        )

        return {
            signature,
            timestamp,
            api_key : config.file_api_key,
            public_id : storedId,
            folder : folderPath,
            resource_type : data.fileType,
            max_file_size : 3000000
        }
    }

    upload = async (data : any) => {
        const res = await pool.query(
            `UPDATE files SET size = $1, "fileType" = $2, "storedPath" = $3, status = 'ready', format = $4 WHERE "storedId" = $5`,
            [data.bytes, data.resource_type, data.secure_url, data.format, data.display_name]
        )

        return;
    }

    initateDelete = async (data : any) => {
        const fileData = await this.get(data);
        const id = `users/${fileData.userId}/uploads/${fileData.storedId}`
        const result = await cloudinary.uploader.destroy(id, {
            resource_type : fileData.fileType,
            invalidate : true
        })

        return {
            fileData : fileData,
            response : result.result
        };
    }

    delete = async ( data : any ) => {
        const res = await pool.query(
            `UPDATE files SET "deletedAt" = NOW() WHERE "storedId" = $1 AND ("deletedAt" IS NULL) RETURNING *`,
            [data.resources[0].display_name]
        )

        return res.rows[0];
    }

    failed = async (data : any) => {
        await pool.query(
            `UPDATE files SET status='failed' WHERE "storedId" = $1`, [data.public_id]
        )
        return;
    }

    get = async ( data : any ) => {
        const res = await pool.query(
            `SELECT * FROM files WHERE id = $1 AND ($2::uuid IS NULL OR "userId" = $2) AND ("deletedAt" IS NULL)`,
            [data.id, data.userId]
        )
        return res.rows[0];
    }

    getAll = async ( data : any ) => {
        const res = await pool.query(
            `SELECT * FROM files WHERE ($1::uuid IS NULL OR "userId" = $1) AND ("deletedAt" IS NULL)`,
            [data.userId]
        )

        return res.rows[0];
    }
}

export { filePgRepositoryClass }
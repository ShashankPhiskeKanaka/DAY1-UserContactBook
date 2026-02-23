import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { logActivity } from "../utils/logging.utils";

const validate = ( schema : z.ZodTypeAny ) => {
    return ( req : Request, res : Response, next : NextFunction ) => {
        const result = schema.safeParse({
            body : req.body,
            cookies : req.cookies,
            params : req.params,
            query : req.query
        })

        if(!result.success) {
            console.log(`Internal Server Error : status : 400, message : ${result.error.issues[0]?.message}`)  
            logActivity.error(400, result.error.issues[0]?.message ?? "NA");          

            return res.status(400).json({
                success : false,
                message : result.error.issues[0]?.message
            })
        }
        next();
    }
}


export { validate };
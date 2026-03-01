import type { Request, Response } from "express";
import { fileServicesClass } from "../services/file.services";
import { v2 as cloudinary } from "cloudinary";
import { serverError } from "../utils/error.utils";

class fileControllerClass {
    constructor (private fileServices : fileServicesClass ) {}

    upload = async ( req : Request, res : Response ) => {
        const data = await this.fileServices.uploadFile(req.body);
        return res.json({
            success : true,
            data : data
        });
    }

    get = async ( req : Request, res : Response ) => {
        const fileData = await this.fileServices.getFile({ id : req.params.id ?? "", userId : req.user.id});
        return res.json({
            success : true,
            data : fileData
        })
    }

    getAll = async ( req : Request, res : Response ) => {
        const filesData = await this.fileServices.getFiles({ userId : req.user.id});
        return res.json({
            success : true,
            data : filesData
        })
    }

    delete = async ( req : Request, res : Response ) => {
        const data = await this.fileServices.deleteFile(req.body);
        return res.json({
            sucess : true,
            data : data
        });
    }

    cloudinaryResponse = async (req : Request, res : Response) => {

        const signature = req.headers['x-cld-signature']?.toString() ?? "";
        const timestamp = Number(req.headers['x-cld-timestamp']);
        const body = JSON.stringify(req.body);
        const isValid = cloudinary.utils.verifyNotificationSignature(
            body,
            timestamp,
            signature,
            7200
        )
        if(!isValid) throw new serverError(400, "Invalid request");

        await this.fileServices.cloudinaryResponse(req.body);
        return res.status(200).send('ok');
    }
}

export { fileControllerClass };
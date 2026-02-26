import type { Request, Response } from "express";
import type { userServicesClass } from "../services/user.services";

class userControllerClass {
    constructor ( private userServices : userServicesClass ) {}

    create = async ( req : Request, res : Response ) => {
        const user = await this.userServices.create(req.body.name, req.body.password, req.body.role);
        return res.json({
            success : true,
            data : user
        });
    }

    delete = async ( req : Request, res : Response ) => {
        const user = await this.userServices.delete(req.cookies.token)
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.json({
            success : true,
            data : user
        });
    }
}

export { userControllerClass }
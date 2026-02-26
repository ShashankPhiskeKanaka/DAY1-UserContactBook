import type { Request, Response } from "express";
import type { authServicesClass } from "../services/auth.services";

class authControllerClass {
    constructor ( private authServices : authServicesClass ) {}

    login = async ( req : Request, res : Response ) => {
        const data = await this.authServices.login(req.body.name, req.body.password);
        res.cookie("token", data.token, { maxAge : 15 * 60 * 1000, sameSite : true, httpOnly : true })
        res.cookie("refreshToken", data.refreshToken, { maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true })
        return res.json({
            success : true,
            message : "Success"
        });
    }

    logout = async ( req : Request, res :Response ) => {
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.json({
            success : true,
            message : "Success"
        });
    }

    forgetPass = async ( req : Request, res : Response ) => {
        const token = await this.authServices.forgetPass(req.body.name);
        return res.json({
            success : true,
            message : `follow the link to change your password : localhost:3000/auth/${token}`
        });
    }

    changePass = async ( req : Request, res : Response ) => {
        const user = await this.authServices.changePass(req.body.password, req.params.token?.toString() ?? "");
        return res.json({
            success : true,
            data : user
        });
    }

    refreshToken = async ( req : Request, res : Response ) => {
        const data = await this.authServices.refreshToken(req.cookies.token, req.cookies.refreshToken);
        res.cookie("token", data.newToken, { maxAge : 15 * 60 * 1000, sameSite : true, httpOnly : true });
        res.cookie("refreshToken", data.newRefreshToken, { maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true });
        return res.json({
            success : true,
            message : "Success"
        })
    }
}

export { authControllerClass }
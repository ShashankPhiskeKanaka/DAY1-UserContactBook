import type { Request, Response } from "express";
import type { authServicesClass } from "../services/auth.services";

class authControllerClass {
    constructor ( private authServices : authServicesClass ) {}

    /**
     * Handles the process of user or admin login
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    login = async ( req : Request, res : Response ) => {
        // extracts the name and password from the req.body and hands it over to the auth service layer
        const data = await this.authServices.login(req.body.name, req.body.password);
        // sets the access token in the cookies with the expiry of 15 minutes
        res.cookie("token", data.token, { maxAge : 15 * 60 * 1000, sameSite : true, httpOnly : true })
        // sets the refresh token in the cookies with the expiry time of 7 days
        res.cookie("refreshToken", data.refreshToken, { maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true })
        // sends a response back to the client with a message and a success value
        return res.json({
            success : true,
            message : "Success"
        });
    }

    /**
     * Handles the logout process of the user or admin
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    logout = async ( req : Request, res :Response ) => {
        // clears the access token and the refresh token from the cookies
        await this.authServices.deleteRefreshToken(req.cookies.refreshToken);
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        // sends a response back to the client along with the message and a success value
        return res.json({
            success : true,
            message : "Success"
        });
    }
    /**
     * Handles the forget password process
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    forgetPass = async ( req : Request, res : Response ) => {
        // extracts the user or admin name from req.body
        const token = await this.authServices.forgetPass(req.body.name);
        // sends back a response to the client along with the forget password token url and a success value
        return res.json({
            success : true,
            message : `follow the link to change your password : localhost:5000/v2/auth/${token}`
        });
    }

    /**
     * Handles the password changing process
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    changePass = async ( req : Request, res : Response ) => {
        // extracts the forget password token from the req parameter along with the password from the body and hands it over to the auth service layer
        const user = await this.authServices.changePass(req.body.password, req.params.token?.toString() ?? "");
        // sends a response back to the client along with the updated password user and a success value
        return res.json({
            success : true,
            data : user
        });
    }

    /**
     * Handles the process of creating a new refresh token and an access token
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    refreshToken = async ( req : Request, res : Response ) => {
        // extracts the old access token and refresh token from the cookies and hands them over to the auth service layer
        const data = await this.authServices.refreshToken(req.cookies.token, req.cookies.refreshToken);
        // sets the access token in the cookies with a expiry of 15minutes
        res.cookie("token", data.newToken, { maxAge : 15 * 60 * 1000, sameSite : true, httpOnly : true });
        // sets the refresh token in the cookies with a expiru of 7 days
        res.cookie("refreshToken", data.newRefreshToken, { maxAge : 7 * 24 * 60 * 60 * 1000, sameSite : true, httpOnly : true });
        // sends a response back to the client with a message and a success value
        return res.json({
            success : true,
            message : "Success"
        })
    }
}

export { authControllerClass }
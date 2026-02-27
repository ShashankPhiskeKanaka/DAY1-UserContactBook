import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config/env"
import { serverError } from "./error.utils"

/**
 * auth utils 
 */
class authUtilsClass {
    /**
     * Handles the process of decoding an access token
     * 
     * @param token 
     * @returns 
     */
    decodeToken = (token : string) => {
        // encapsulated in a try catch block, it uses veridfy methods from jsonwebtoken package
        try{
            return jwt.verify(token , config.secret as string) as { id : string, role : string }
        }catch (err) {
            throw new serverError(400, "Invalid token provided");
        }
    }
    /**
     * generates an access token
     * 
     * @param id 
     * @param role 
     * @returns 
     */

    generateToken = ( id : string, role : string ) => {
        // embeds the user id and role into the token and provides an expiration date 
        return jwt.sign( { id, role }, config.secret as string, { expiresIn : "1d" } );
    }

    /**
     * Decodes a forget password token
     * 
     * @param token 
     * @returns 
     */
    decodeForgetToken = ( token : string ) => {
        // embedded in a try catch block uses verify method from the jsonwebtoken package to decode the id from the token
        try{
            return jwt.verify(token, config.secret as string) as { id : string }
        }catch (err) {
            throw new serverError(400, "Invalid token provided");
        }
    }

    /**
     * Generates a forget password token
     * 
     * @param id 
     * @returns 
     */
    generateForgetToken = ( id : string ) => {
        // embeds the client id into the token along with an expiration time
        return jwt.sign({ id }, config.secret as string, { expiresIn : "15m" });
    }

    /**
     * Compares the client provided password along with the hashed password
     * 
     * @param password 
     * @param hashPass 
     * @returns 
     */
    comparePassword = async ( password : string, hashPass : string ) => {
        // uses compare method from the bcrypt package
        return await bcrypt.compare(password, hashPass);
    }

    /**
     * Hashes a normal string password
     * 
     * @param password 
     * @returns 
     */
    hashPass = async ( password : string ) => {
        // hashes the password using hash method from the bcrypt package along with salt value
        return await bcrypt.hash(password, 10);
    }

    /**
     * defines the id if the role is user or admin
     * 
     * @param token 
     * @returns 
     */
    defineId = (token : string) => {
        const { id, role } = this.decodeToken(token);
        let userId = undefined;
        if(role == "user"){
            userId = id;
        }

        return userId;
    }
}

const authUtil = new authUtilsClass();
export { authUtil };
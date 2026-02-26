import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config/env"
import { serverError } from "./error.utils"

class authUtilsClass {
    decodeToken = (token : string) => {
        try{
            return jwt.verify(token , config.secret as string) as { id : string, role : string }
        }catch (err) {
            throw new serverError(400, "Invalid token provided");
        }
    }

    generateToken = ( id : string, role : string ) => {
        return jwt.sign( { id, role }, config.secret as string, { expiresIn : "1d" } );
    }

    decodeForgetToken = ( token : string ) => {
        try{
            return jwt.verify(token, config.secret as string) as { id : string }
        }catch (err) {
            throw new serverError(400, "Invalid token provided");
        }
    }

    generateForgetToken = ( id : string ) => {
        return jwt.sign({ id }, config.secret as string, { expiresIn : "15m" });
    }

    comparePassword = async ( password : string, hashPass : string ) => {
        return await bcrypt.compare(password, hashPass);
    }

    hashPass = async ( password : string ) => {
        return await bcrypt.hash(password, 10);
    }

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
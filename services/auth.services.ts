import type { tokenPgRepositoryClass } from "../repository/token/token.pgrepository";
import type { userPgRepositoryClass } from "../repository/user/user.pgrepository"
import { authUtil } from "../utils/auth.utils";
import { serverError } from "../utils/error.utils";


class authServicesClass {
    constructor ( private userMethods : userPgRepositoryClass, private tokenMethods : tokenPgRepositoryClass ) {}

    login = async ( name : string, password : string ) => {
        const user = await this.userMethods.get(name);
        if(!user) throw new serverError(400, "User does not exists");
        const flag = await authUtil.comparePassword(password, user.password);
        if(flag){
            const data = await this.tokenMethods.create(user.id ?? "", user.role ?? "");
            return data;
        }

        throw new serverError(400, "Incorrect Password");
    }

    changePass = async ( password : string, token : string ) => {
        const { id } = authUtil.decodeForgetToken(token);
        let user = await this.userMethods.getById(id);
        if(!user) throw new serverError(400, "User does not exist");
        const hashedPass = await authUtil.hashPass(password);
        user = await this.userMethods.update(id, hashedPass);

        return user;
    }

    forgetPass = async ( name : string ) => {
        let user = await this.userMethods.get(name);
        if(!user) throw new serverError(400, "User does not exist");
        const token = authUtil.generateForgetToken(user.id ?? "");

        return token;
    }

    refreshToken = async ( token : string, refreshToken : string ) => {
        const { id, role } = authUtil.decodeToken(token);
        const data = await this.tokenMethods.createRefreshToken(refreshToken, id, role);
        return data;
    }    

}

export { authServicesClass }
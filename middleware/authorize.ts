import type { NextFunction, Request, Response } from "express";
import { authUtil } from "../utils/auth.utils";
import { serverError } from "../utils/error.utils";

const authorize = async (req : Request, res : Response, next : NextFunction) => {
    if(!req.cookies?.token) throw new serverError(400, "Please login");
    const { id, role } = authUtil.decodeToken(req.cookies.token);
    if(!id || !role) throw new serverError(400, "Please login");
    next();
}

export { authorize }
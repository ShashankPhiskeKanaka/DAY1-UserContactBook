import type { NextFunction, Request, Response } from "express";
import { logActivity } from "./logging.utils";

class errorHandlerClass {
    controllerWrapper = (fn : any) => {
        return ( req : Request, res : Response, next : NextFunction ) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        }
    }
}

class globalErrorHandlerClass {
    handleError = (err : any, req : Request, res : Response, next : NextFunction) => {
        logActivity.error(err.status, err.message);

        return res.status(err.status).json({
            success : false,
            message : err.message
        });
    }
}

class serverError extends Error{
    public status : number;
    constructor  ( status : number, message : string ) {
        super(message);
        this.status = status;
        this.message = message;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export { serverError, errorHandlerClass, globalErrorHandlerClass }
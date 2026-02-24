import type { NextFunction, Request, Response } from "express";
import { logActivity } from "./logging.utils";

// error handler , controllers are wrapped inside this so that the serverError that they will throw are caught and passed the
// global error handler
class errorHandlerClass {
    controllerWrapper = (fn : any) => {
        return ( req : Request, res : Response, next : NextFunction ) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        }
    }
}

// global error handler, receives the serverError thrown and provides a response back and logs the error
class globalErrorHandlerClass {
    handleError = (err : any, req : Request, res : Response, next : NextFunction) => {
        logActivity.error(err.status ?? 500, err.message);

        return res.status(err.status ?? 500).json({
            success : false,
            message : err.message
        });
    }
}

// custom serverError class
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
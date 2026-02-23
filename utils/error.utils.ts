import type { NextFunction, Request, Response } from "express";

class errorHandlerClass {
    controllerWrapper = (fn : any) => {
        return ( req : Request, res : Response, next : NextFunction ) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        }
    }
}

class globalErrorHandlerClass {
    handleError = (err : any, req : Request, res : Response, next : NextFunction) => {
        console.log(`Internal server error status : ${err.status} with the message : ${err.message}`);

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
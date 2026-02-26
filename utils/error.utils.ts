import type { NextFunction, Request, Response } from "express";
import { logActivity } from "./logging.utils";

/**
 * error handler which contains the async wrapper for all async controllers
 */
class errorHandlerClass {
    /**
     * async controller wrapper, ensures that all the async errors occuring are caught and passed to the next function
     * 
     * eliminates the need for repeated try catch blocks
     * 
     * @param fn - the async controller
     * @returns 
     */

    controllerWrapper = (fn : any) => {
        return ( req : Request, res : Response, next : NextFunction ) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        }
    }
}

class globalErrorHandlerClass {
    /**
     * 
     * global error handler method, catches incoming errors and logs them with the help of logActivity util
     * 
     * returns an error response back to the client
     * 
     * @param err 
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    handleError = (err : any, req : Request, res : Response, next : NextFunction) => {
        logActivity.error(err.status ?? 500, err.message);

        return res.status(err.status ?? 500).json({
            success : false,
            message : err.message
        });
    }
}

/**
 * custom error class for handling failures and errors
 * 
 * extends the native Error class
 * 
 * ensures that the prototype chain is correctly maintained
 * 
 */
class serverError extends Error{
    public status : number;
    /**
     * 
     * @param status : the HTTP status code
     * @param message : the human readable error message
     */
    constructor  ( status : number, message : string ) {
        super(message);
        this.status = status;
        this.message = message;

        // restores the prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        // captures the stack trace
        Error.captureStackTrace(this);
    }
}

export { serverError, errorHandlerClass, globalErrorHandlerClass }
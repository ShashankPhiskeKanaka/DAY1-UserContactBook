import type { Request, Response } from "express";
import type { reportServicesClass } from "../services/report.services";

class reportControllerClass {
    constructor( private reportServices : reportServicesClass ) {}

    /**
     * Handles the report creation process of the contacts
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    report = async ( req : Request, res : Response ) => {
        // extracts the tokens from the req.cookies and hands them over to the report methods from the report services
        const report = await this.reportServices.report(req.cookies.token);
        // sends back a response to the client along with the report data and a success boolean value
        return res.json({
            success : true,
            data : report
        });
    }
}

// exports the controller to be used in factory
export { reportControllerClass }
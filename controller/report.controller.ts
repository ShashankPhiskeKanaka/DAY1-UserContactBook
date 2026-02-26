import type { Request, Response } from "express";
import type { reportServicesClass } from "../services/report.services";

class reportControllerClass {
    constructor( private reportServices : reportServicesClass ) {}

    report = async ( req : Request, res : Response ) => {
        const report = await this.reportServices.report(req.cookies.token);
        return res.json({
            success : true,
            data : report
        });
    }
}

export { reportControllerClass }
import express from "express"
import { reportFactory } from "../../factory/report.factory";
import { errorHandler } from "../../factory/error.factory";

const reportRouter = express.Router();

const reportController = reportFactory.create();

reportRouter.get("/contact-stats", errorHandler.controllerWrapper(reportController.report));

export { reportRouter as v2ReportRouter };
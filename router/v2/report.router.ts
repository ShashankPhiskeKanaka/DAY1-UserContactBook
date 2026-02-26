import express from "express"
import { reportFactory } from "../../factory/report.factory";
import { errorHandler } from "../../factory/error.factory";
import { validate } from "../../middleware/validate";
import { authSchema } from "../../schema/auth.schema";

const reportRouter = express.Router();

const reportController = reportFactory.create();

reportRouter.get("/contact-stats", errorHandler.controllerWrapper(validate(authSchema)), errorHandler.controllerWrapper(reportController.report));

export { reportRouter as v2ReportRouter };
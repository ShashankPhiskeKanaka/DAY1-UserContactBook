import { errorHandlerClass, globalErrorHandlerClass } from "../utils/error.utils.js";

class errorFactory {
    static createGlobalErrorHandler () {
        const handler = new globalErrorHandlerClass();
        return handler;
    }

    static createErrorHandler () {
        const handler = new errorHandlerClass();
        return handler;
    }
}

const errorHandler = errorFactory.createErrorHandler();
const globalErrorHandler = errorFactory.createGlobalErrorHandler();

export { errorHandler, globalErrorHandler };
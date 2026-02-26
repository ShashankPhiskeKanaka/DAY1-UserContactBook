

class logActivityClass {

    /**
     * logs the performed activity in the server
     * 
     * uses console.log to log the provided message into the console
     * 
     * @param message 
     */
    log = (message : string) => {
        console.log(`Activity Log : ${message}`);
    }

    /**
     * 
     * logs the occurred error in the server
     * 
     * uses console.log to log the provided error status and message
     * 
     * @param status 
     * @param message 
     */

    error = (status : number, message : string) => {
        console.log(`Internal server error : Status : ${status}, message : ${message}`)
    }
}

const logActivity = new logActivityClass();

export { logActivity };
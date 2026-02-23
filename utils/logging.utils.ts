class logActivityClass {
    log = (message : string) => {
        console.log(`Activity Log : ${message}`);
    }

    error = (status : number, message : string) => {
        console.log(`Internal server error : Status : ${status}, message : ${message}`)
    }
}

const logActivity = new logActivityClass();

export { logActivity };
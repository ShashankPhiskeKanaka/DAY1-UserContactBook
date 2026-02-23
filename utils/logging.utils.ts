class logActivityClass {
    log = (message : string) => {
        console.log(`Activity Log : ${message}`);
    }
}

const logActivity = new logActivityClass();

export { logActivity };
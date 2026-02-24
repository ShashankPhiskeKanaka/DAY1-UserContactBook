import type { baseUser } from "../../model/user.model";

// defined abstract class and methods that will be used by the repositories

abstract class userMethodsClass {
    abstract create ( data : baseUser ) : Promise<baseUser>;
    abstract getAll () : Promise<baseUser[]>;
    abstract get ( email : string ) : Promise<baseUser>;
    abstract update (data : baseUser) : Promise<baseUser>;
    abstract delete ( email : string ) : Promise<baseUser>;
}

export { userMethodsClass };
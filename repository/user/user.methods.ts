import type { baseUser } from "../../model/user.model";

abstract class userMethodsClass {
    abstract create ( data : baseUser ) : Promise<baseUser>;
    abstract getAll () : Promise<baseUser[]>;
    abstract get ( email : string ) : Promise<baseUser>;
    abstract update (data : baseUser) : Promise<baseUser>;
    abstract delete ( email : string ) : Promise<baseUser>;
}

export { userMethodsClass };
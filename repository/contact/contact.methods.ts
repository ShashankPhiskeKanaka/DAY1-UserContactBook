import type { baseContact, pageinationData } from "../../model/contact.model";

// defined abstract class and methods that will be used by the repositories

abstract class contactMethodsClass {
    abstract create ( data : baseContact ) : Promise<baseContact>;
    abstract getAll (limit : number | undefined, search : string | undefined, sort : string | undefined, lastCreatedAt : string | undefined, lastId : string | undefined) : Promise<baseContact[]>;
    abstract get ( id : string ) : Promise<baseContact>;
    abstract update (data : baseContact) : Promise<baseContact>;
    abstract delete ( id : string ) : Promise<baseContact>;
}

export { contactMethodsClass };
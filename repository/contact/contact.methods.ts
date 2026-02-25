import type { baseContact, pageinationData } from "../../model/contact.model";

// defined abstract class and methods that will be used by the repositories

abstract class contactMethodsClass {
    abstract create ( data : baseContact ) : Promise<baseContact>;
    abstract getAll ( cursor : string | undefined, limit : number | undefined, search : string | undefined, email : string | undefined, sort : string | undefined ) : Promise<pageinationData>;
    abstract get ( id : string ) : Promise<baseContact>;
    abstract update (data : baseContact) : Promise<baseContact>;
    abstract delete ( id : string ) : Promise<baseContact>;
    abstract createAuditLog ( data : any ) : Promise<any>;
}

export { contactMethodsClass };
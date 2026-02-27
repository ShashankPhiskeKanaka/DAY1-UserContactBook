import type { baseContact, pageinationData } from "../../model/contact.model";

/**
 * Abstract class for contacts repository layer
 * the necessary methods are defined here
 */
abstract class contactMethodsClass {
    abstract create ( data : baseContact, userId : string ) : Promise<baseContact>;
    abstract getAll (limit : number | undefined, search : string | undefined, sort : string | undefined, lastCreatedAt : string | undefined, lastId : string | undefined, userId : string | undefined) : Promise<baseContact[]>;
    abstract get ( id : string, userId : string | undefined ) : Promise<baseContact>;
    abstract update (data : baseContact, userId : string | undefined) : Promise<baseContact>;
    abstract delete ( id : string, userId : string | undefined ) : Promise<baseContact>;
}

export { contactMethodsClass };
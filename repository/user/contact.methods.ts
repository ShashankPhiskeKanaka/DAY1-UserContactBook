import type { baseContact } from "../../model/contact.model";

// defined abstract class and methods that will be used by the repositories

abstract class contactMethodsClass {
    abstract create ( data : baseContact ) : Promise<baseContact>;
    abstract getAll () : Promise<baseContact[]>;
    abstract get ( email : string ) : Promise<baseContact>;
    abstract update (data : baseContact) : Promise<baseContact>;
    abstract delete ( email : string ) : Promise<baseContact>;
}

export { contactMethodsClass };
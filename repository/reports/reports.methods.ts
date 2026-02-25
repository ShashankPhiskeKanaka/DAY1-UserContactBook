import type { baseContact } from "../../model/contact.model";

abstract class reportsMethodsClass {
    abstract get () : Promise<baseContact[]> ;
}

export { reportsMethodsClass }
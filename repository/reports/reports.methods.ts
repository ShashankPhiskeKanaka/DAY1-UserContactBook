import type { baseContact } from "../../model/contact.model";

/**
 * Abstract class for report repository layer
 * the necessary methods are defined here
 */
abstract class reportsMethodsClass {
    abstract get () : Promise<baseContact[]> ;
}

export { reportsMethodsClass }
import { prisma } from "../../db/prisma";
import type { baseContact } from "../../model/contact.model";
import { contactMethodsClass } from "./contact.methods";

// prisma postgres db repository class

class contactPrismaRepositoryClass extends contactMethodsClass {
    // creates an user
    create = async ( data : baseContact ) : Promise<baseContact> => {
        const user = prisma.contact.create({ data });
        return user;
    }

    // fetches single user using email
    get = async ( email : string ) : Promise<baseContact> => {
        const user = await prisma.contact.findUnique({ where : { email } });
        return user ?? <baseContact>{};
    }

    // fetches all users
    getAll = async () : Promise<baseContact[]> => {
        const users = await prisma.contact.findMany();
        return users;
    }


    // updates user, updates name, address and phonenumber if they exist
    update = async ( data : baseContact ) : Promise<baseContact> => {
        const user = await prisma.contact.update({ where : { email : data.email }, data : {
            name : data?.name,
            address : data?.address,
            phonenumber : data?.phonenumber
        } })
        return user;
    }

    // deletes an user
    delete = async ( email : string ) : Promise<baseContact> => {
        const user = await prisma.contact.delete({ where : { email } })
        return user;
    }
}

export { contactPrismaRepositoryClass }
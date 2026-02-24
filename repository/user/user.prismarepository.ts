import { prisma } from "../../db/prisma";
import type { baseUser } from "../../model/user.model";
import { userMethodsClass } from "./user.methods";

// prisma postgres db repository class

class userPrismaRepositoryClass extends userMethodsClass {
    // creates an user
    create = async ( data : baseUser ) : Promise<baseUser> => {
        const user = prisma.user.create({ data });
        return user;
    }

    // fetches single user using email
    get = async ( email : string ) : Promise<baseUser> => {
        const user = await prisma.user.findUnique({ where : { email } });
        return user ?? <baseUser>{};
    }

    // fetches all users
    getAll = async () : Promise<baseUser[]> => {
        const users = await prisma.user.findMany();
        return users;
    }


    // updates user
    update = async ( data : baseUser ) : Promise<baseUser> => {
        const user = await prisma.user.update({ where : { email : data.email }, data : {
            name : data?.name,
            address : data?.address,
            phonenumber : data?.phonenumber
        } })
        return user;
    }

    // deletes an user
    delete = async ( email : string ) : Promise<baseUser> => {
        const user = await prisma.user.delete({ where : { email } })
        return user;
    }
}

export { userPrismaRepositoryClass }
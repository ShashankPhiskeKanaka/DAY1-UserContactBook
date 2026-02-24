import { prisma } from "../../db/prisma";
import type { baseUser } from "../../model/user.model";
import { userMethodsClass } from "./user.methods";

class userPrismaRepositoryClass extends userMethodsClass {
    create = async ( data : baseUser ) : Promise<baseUser> => {
        const user = prisma.user.create({ data });
        return user;
    }

    get = async ( email : string ) : Promise<baseUser> => {
        const user = await prisma.user.findUnique({ where : { email } });
        return user ?? <baseUser>{};
    }

    getAll = async () : Promise<baseUser[]> => {
        const users = await prisma.user.findMany();
        return users;
    }

    update = async ( data : baseUser ) : Promise<baseUser> => {
        const email = data.email
        const users = await prisma.user.update({ where : { email }, data })
        return users;
    }

    delete = async ( email : string ) : Promise<baseUser> => {
        const user = await prisma.user.delete({ where : { email } })
        return user;
    }
}

export { userPrismaRepositoryClass }
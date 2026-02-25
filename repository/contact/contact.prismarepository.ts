import { prisma } from "../../db/prisma";
import type { auditData, baseContact, pageinationData } from "../../model/contact.model";
import { Prisma } from "../../src/generated/prisma";
import { contactMethodsClass } from "./contact.methods";

// prisma postgres db repository class

type AuditAction = "CREATE" | "UPDATE" | "DELETE";

interface AuditOptions {
    model: string;
    action: AuditAction;
    recordId: string;
    before?: object | null;
    after?: object | null;
    metadata?: {
        ip?: string;
        userAgent?: string;
        reason?: string;
        [key: string]: any;
    };
}

class contactPrismaRepositoryClass extends contactMethodsClass {
    // creates an user
    create = async ( data : baseContact ) : Promise<baseContact> => {
        const user = prisma.contact.create({ data });
        return user;
    }

    // fetches single user using email
    get = async ( id : string ) : Promise<baseContact> => {
        const user = await prisma.contact.findUnique({ where : { id } });
        return user ?? <baseContact>{};
    }

    // fetches all users
    getAll = async ( cursor : string | undefined, limit : number | undefined, search : string | undefined, email : string | undefined, sort : string | undefined ) : Promise<pageinationData> => {

        const limitnum = Math.min(limit ?? 10, 50);

        const where : any = {};

        if(search) {
            where.OR = [
                {
                    name : {
                        contains : search,
                        mode : "insensitive",
                    },
                },
                {
                    email : {
                        contains : search,
                        mode : "insensitive",
                    },
                },

            ]
        }

        if(email) {
            where.email = email;
        }

        let orderBy : any = [{ createdAt : "asc" }]

        if(sort){
            const parsed = sort.split(",").map((field) => {
                const [ key, direction ] = field.split(":");
                if(!key) return null;
                return { [key] : direction == "desc" ? "desc" : "asc" }
            }).filter(Boolean);

            if(parsed.length > 0){
                orderBy = parsed
            }
        }

        const contacts = await prisma.contact.findMany({
            take : limitnum + 1,
            where,
            orderBy,
            ...(cursor && {
                cursor : { id : cursor },
                skip : 1
            }),
        });

        const hasMoreData = contacts.length > limitnum;
        const resultContacts = hasMoreData ? contacts.slice(0, limitnum) : contacts;
        const lastItem = resultContacts[resultContacts.length - 1]
        const nextCursor = hasMoreData ? lastItem?.id : undefined;

        return {
            contacts : resultContacts,
            nextCursor : nextCursor ?? "NA",
            hasMoreData : !!nextCursor
        }
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
    delete = async ( id : string ) : Promise<baseContact> => {
        const user = await prisma.contact.delete({ where : { id } })
        return user;
    }

    createAuditLog = async (options: AuditOptions) => {
    try {
        await prisma.auditLog.create({
            data: {
                model: options.model,
                action: options.action,
                recordId: options.recordId,
                before: options.before ?? Prisma.JsonNull,
                after: options.after ?? Prisma.JsonNull,
                metadata: options.metadata ?? Prisma.JsonNull,
                performedAt: new Date(),
            }
        });
    } catch (error) {
        // audit log failure should NEVER crash your main operation
        console.error("Audit log failed:", error);
    }
}
}


export { contactPrismaRepositoryClass }
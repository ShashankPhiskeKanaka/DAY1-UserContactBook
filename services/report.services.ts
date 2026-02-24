import type { contactPrismaRepositoryClass } from "../repository/user/contact.prismarepository";

class reportServicesClass {
    constructor ( private userMethods : contactPrismaRepositoryClass ) {}
    
    report = async () => {
        const date = new Date()
        const day = date.getDay();

        const users = await this.userMethods.getAll();

    }
}

export { reportServicesClass }
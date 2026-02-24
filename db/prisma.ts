import { config } from '../config/env'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

// prisma conneection methods and prisma object creation

const adapter = new PrismaPg({
  connectionString: config.dburl
})

const prisma = new PrismaClient({ adapter })

const connectPrisma = async () => {
  try{
    await prisma.$connect();
    console.log("connected");
    
  }catch (err) {
    console.log(err);
  }
}

export { prisma, connectPrisma }
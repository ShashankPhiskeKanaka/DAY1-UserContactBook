import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
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
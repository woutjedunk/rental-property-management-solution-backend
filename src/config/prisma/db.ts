import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log(prisma.$executeRaw`SELECT NOW()`)


export default prisma;
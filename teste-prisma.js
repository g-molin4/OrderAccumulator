import prisma from './OrderAccumulator/src/prisma/client.js';

await prisma.$connect();
console.log('✅ Prisma conectado com sucesso');
await prisma.$disconnect();
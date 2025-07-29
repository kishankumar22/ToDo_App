import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
});

// 👉 Query log handler
// prisma.$on('query', (e) => {
//   console.log('🟢 Prisma Query:', e.query);
//   console.log('⏱ Duration:', e.duration + 'ms');
// });

// 👉 Error log handler
prisma.$on('error', (e) => {
  console.error('❌ Prisma Error:', e.message);
});

// Connect
prisma.$connect()
  .then(() => console.log('✅ Prisma: Connected to database'))
  .catch((error) => {
    console.error('❌ Prisma connection failed:', error.message);
    process.exit(1);
  });

// Graceful disconnect on exit
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🔌 Prisma: Disconnected from database (SIGINT)');
  process.exit(0);
});

export default prisma;

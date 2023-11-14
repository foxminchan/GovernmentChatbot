import * as process from 'process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lookup = await prisma.topic.create({
    data: {
      name: 'Tra cứu',
    },
  });

  const qa = await prisma.topic.create({
    data: {
      name: 'Hỏi đáp',
    },
  });

  const helper = await prisma.topic.create({
    data: {
      name: 'Hỗ trợ',
    },
  });

  console.log({ lookup, qa, helper });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

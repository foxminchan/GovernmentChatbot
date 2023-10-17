import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {
  const lookup = await prisma.lookup.create({
    data: {
      name: 'Tra cứu thông tin',
    },
  });

  const qa = await prisma.qa.create({
    data: {
      name: 'Hỏi đáp',
    },
  });

  const helper = await prisma.helper.create({
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

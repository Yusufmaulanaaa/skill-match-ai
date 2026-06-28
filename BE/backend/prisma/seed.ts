import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'yusuf@gmail.com';
  const password = '123';
  const fullName = 'Yusuf';

  // Cek apakah user sudah ada
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`User ${email} sudah ada, update password...`);
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    console.log('Password berhasil diupdate!');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  console.log(`User ${email} berhasil dibuat dengan password: ${password}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

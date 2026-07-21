import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@mozytech.com';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('Set ADMIN_PASSWORD in your .env before running this script.');
    process.exit(1);
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.create({
    data: { email, passwordHash },
  });

  console.log(`Admin user created: ${admin.email}`);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import prisma from '../lib/prisma';

dotenv.config();

async function debugAuth() {
  const email = process.env.ADMIN_EMAIL as string;
  const password = process.env.ADMIN_PASSWORD as string;

  console.log('Looking up email:', JSON.stringify(email));
  console.log('Using password:', JSON.stringify(password));

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin) {
    console.log('No admin found with that email.');
    process.exit(1);
  }

  console.log('Found admin:', admin.email);
  console.log('Stored hash:', admin.passwordHash);

  const match = await bcrypt.compare(password, admin.passwordHash);
  console.log('Password match:', match);

  process.exit(0);
}

debugAuth();

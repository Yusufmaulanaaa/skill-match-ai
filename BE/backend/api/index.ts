import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

const DB_PATH = '/tmp/dev.db';
process.env.DATABASE_URL = `file:${DB_PATH}`;

async function initDb() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '');
  }

  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "User" ("id" TEXT NOT NULL, "fullName" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL, "education" TEXT, "interest" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"))`);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "UserSkill" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "skill" TEXT NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "UserSkill_userId_idx" ON "UserSkill"("userId")`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "QuizResult" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "answers" TEXT NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "QuizResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "QuizResult_userId_idx" ON "QuizResult"("userId")`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "CareerRecommendation" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "sessionId" TEXT NOT NULL, "careerName" TEXT NOT NULL, "matchPercentage" INTEGER NOT NULL, "description" TEXT NOT NULL, "salary" TEXT, "growthRate" TEXT, "marketDemand" TEXT, "requiredSkills" TEXT NOT NULL, "learningPath" TEXT NOT NULL, "suggestedProjects" TEXT NOT NULL, "strengths" TEXT, "weaknesses" TEXT, "careerGrowth" TEXT, "geminiAnalysis" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("id"), CONSTRAINT "CareerRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CareerRecommendation_userId_idx" ON "CareerRecommendation"("userId")`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CareerRecommendation_sessionId_idx" ON "CareerRecommendation"("sessionId")`);

  const existing = await prisma.$queryRaw`SELECT id FROM "User" WHERE email = ${'yusuf@gmail.com'}`;
  if ((existing as any[]).length === 0) {
    const hash = bcrypt.hashSync('123', 12);
    await prisma.$executeRawUnsafe(`INSERT INTO "User" ("id", "fullName", "email", "password") VALUES ('${randomUUID()}', 'Yusuf', 'yusuf@gmail.com', '${hash}')`);
  }

  await prisma.$disconnect();
}

let initPromise: Promise<void> | null = null;

function ensureDb() {
  if (!initPromise) {
    initPromise = initDb();
  }
  return initPromise;
}

const appPromise = ensureDb().then(() => {
  return require('../src/app').default;
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await appPromise;
  return app(req, res);
}

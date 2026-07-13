import type { VercelRequest, VercelResponse } from '@vercel/node';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const DB_PATH = '/tmp/dev.db';

function initDb() {
  const db = new Database(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "password" TEXT NOT NULL,
      "education" TEXT,
      "interest" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS "UserSkill" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "skill" TEXT NOT NULL,
      CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE INDEX IF NOT EXISTS "UserSkill_userId_idx" ON "UserSkill"("userId");
    CREATE TABLE IF NOT EXISTS "QuizResult" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "answers" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "QuizResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE INDEX IF NOT EXISTS "QuizResult_userId_idx" ON "QuizResult"("userId");
    CREATE TABLE IF NOT EXISTS "CareerRecommendation" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "sessionId" TEXT NOT NULL,
      "careerName" TEXT NOT NULL,
      "matchPercentage" INTEGER NOT NULL,
      "description" TEXT NOT NULL,
      "salary" TEXT,
      "growthRate" TEXT,
      "marketDemand" TEXT,
      "requiredSkills" TEXT NOT NULL,
      "learningPath" TEXT NOT NULL,
      "suggestedProjects" TEXT NOT NULL,
      "strengths" TEXT,
      "weaknesses" TEXT,
      "careerGrowth" TEXT,
      "geminiAnalysis" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "CareerRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE INDEX IF NOT EXISTS "CareerRecommendation_userId_idx" ON "CareerRecommendation"("userId");
    CREATE INDEX IF NOT EXISTS "CareerRecommendation_sessionId_idx" ON "CareerRecommendation"("sessionId");
  `);

  const existing = db.prepare('SELECT id FROM "User" WHERE email = ?').get('yusuf@gmail.com');
  if (!existing) {
    const hash = bcrypt.hashSync('123', 12);
    db.prepare('INSERT INTO "User" (id, fullName, email, password) VALUES (?, ?, ?, ?)').run(
      randomUUID(), 'Yusuf', 'yusuf@gmail.com', hash
    );
  }

  db.close();
}

initDb();

process.env.DATABASE_URL = `file:${DB_PATH}`;

const app = require('../src/app').default;

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}

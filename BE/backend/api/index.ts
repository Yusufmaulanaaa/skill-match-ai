import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const DB_SOURCE = path.join(__dirname, '..', 'prisma', 'dev.db');
const DB_TARGET = '/tmp/dev.db';

if (!fs.existsSync(DB_TARGET)) {
  try {
    fs.copyFileSync(DB_SOURCE, DB_TARGET);
  } catch {
    fs.writeFileSync(DB_TARGET, '');
  }
}

process.env.DATABASE_URL = `file:${DB_TARGET}`;

const app = require('../src/app').default;

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}

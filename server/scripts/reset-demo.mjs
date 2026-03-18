import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '..', 'db.json');

const passwordHash = bcrypt.hashSync('123456', 10);

const data = {
  users: [
    {
      id: 'u_001',
      phone: '18800000000',
      passwordHash,
      name: 'Duitin User',
      avatar: '',
      balance: 0,
      frozen: 0,
    },
  ],
  tasks: [
    { id: 't_001', title: 'Watch short video', reward: 8, status: 'available' },
    { id: 't_002', title: 'Complete survey', reward: 12, status: 'available' },
    { id: 't_003', title: 'Product review', reward: 15, status: 'available' },
  ],
  taskCompletions: [],
  withdrawals: [],
  revokedTokens: [],
};

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
console.log('Demo data reset complete:', dbPath);

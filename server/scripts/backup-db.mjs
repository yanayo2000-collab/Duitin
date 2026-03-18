import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverDir = path.resolve(__dirname, '..');
const dbPath = path.join(serverDir, 'duitin.sqlite');
const backupDir = path.join(serverDir, 'backups');

if (!fs.existsSync(dbPath)) {
  console.error('Database not found:', dbPath);
  process.exit(1);
}

fs.mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const out = path.join(backupDir, `duitin-${stamp}.sqlite`);
fs.copyFileSync(dbPath, out);

console.log('Backup created:', out);

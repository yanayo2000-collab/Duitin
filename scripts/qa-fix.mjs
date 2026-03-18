import { execSync } from 'node:child_process';

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('pkill -f "node server/index.js" || true');
  run('pkill -f "vite --host 127.0.0.1" || true');
  run('npm run db:reset');
  console.log('\n✅ Common runtime issues fixed: stale process killed + demo DB reset.');
  console.log('Now start services:');
  console.log('  npm run server');
  console.log('  npm run dev -- --host 127.0.0.1 --port 5173');
} catch (e) {
  console.error('❌ qa-fix failed', e?.message || e);
  process.exit(1);
}

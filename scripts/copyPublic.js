import fs from 'fs';
import path from 'path';

function copyPublic(appName) {
  const src = path.resolve('packages', appName, 'public', 'index.html');
  const destDir = path.resolve('dist', appName);
  const dest = path.join(destDir, 'index.html');
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}

['admin', 'user'].forEach(copyPublic);

import fs from 'fs';
import path from 'path';

// Use the current working directory (project root) so paths resolve correctly on Windows
const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, 'node_modules', 'bootstrap-icons', 'font', 'fonts');
const destDir = path.join(projectRoot, 'public', 'fonts');

fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(sourceDir).forEach((file) => {
  const src = path.join(sourceDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(src, dest);
});

console.log('Bootstrap icon fonts copied to public/fonts');


import * as fs from 'fs';
import * as path from 'path';

const files = fs.readdirSync('.');
const imgFiles = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
for (const file of imgFiles) {
  fs.renameSync(file, path.join('public', file));
}
console.log('Moved', imgFiles.length, 'files');

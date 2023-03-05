/**
 * Render ejs file to temp/preview.html (will overwrite existing file)
 *
 * yarn previewEmail <FILE_PATH> <PARAMS>
 * Example:
 * NODE_PATH=src/ npx ts-node script/email.ts src/email/layout/MainLayout.tsx
 */

// helpers
import fs from 'fs';
import path from 'path';
import email from '../src/service/email';
const emailPath = process.argv[2];
// const params = process.argv[3]; // params

async function renderFile() {
  // Generate html for statement
  const emailModule = require(path.join(__dirname, '..', emailPath));
  const { html, json, errors } = email.render(emailModule.default({}));
  try {
    fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'preview.html'), html);
  } catch (err) {
    console.log(err);
  }
}

renderFile();

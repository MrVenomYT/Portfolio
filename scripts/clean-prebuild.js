import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function enforceNodeVersion() {
  const currentVersion = process.version;
  const majorVersion = parseInt(currentVersion.replace('v', '').split('.')[0], 10);

  console.log(`🟢 [Build Precheck] Running Node.js version: ${currentVersion}`);

  if (majorVersion < 20) {
    console.error(`❌ Node.js version 20 or higher is required for Next.js 15+! Current version: ${currentVersion}`);
    process.exit(1);
  }
}

function cleanBuildCache() {
  const nextFolder = path.join(rootDir, '.next');

  if (fs.existsSync(nextFolder)) {
    console.log('🧹 [Build Precheck] Cleaning previous .next build cache...');
    try {
      fs.rmSync(nextFolder, { recursive: true, force: true });
      console.log('✅ [Build Precheck] .next directory cleaned successfully.');
    } catch (err) {
      console.warn('⚠️ [Build Precheck] Warning cleaning .next folder:', err.message);
    }
  } else {
    console.log('✨ [Build Precheck] No existing .next build cache found.');
  }
}

enforceNodeVersion();
cleanBuildCache();

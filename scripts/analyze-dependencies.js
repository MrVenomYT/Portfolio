import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function getPackageLatestInfo(packageName) {
  try {
    // Encoded name for scoped packages like @types/node
    const encodedName = packageName.startsWith('@')
      ? `@${encodeURIComponent(packageName.slice(1))}`
      : encodeURIComponent(packageName);

    const response = await fetch(`https://registry.npmjs.org/${encodedName}/latest`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return {
      latestVersion: data.version,
      peerDependencies: data.peerDependencies || {},
      engines: data.engines || {},
    };
  } catch (error) {
    return {
      latestVersion: 'Unknown',
      error: error.message,
    };
  }
}

function cleanVersion(ver) {
  return ver.replace(/^[\^~>=<]+/, '');
}

function isNext15Compatible(pkgName, latestInfo) {
  const peers = latestInfo.peerDependencies || {};
  const notes = [];

  if (peers.react) {
    if (peers.react.includes('19') || peers.react.includes('*') || peers.react.includes('>=18')) {
      // Compatible with React 19 / Next.js 15
    } else if (!peers.react.includes('19')) {
      notes.push(`Peer react: "${peers.react}" may require --legacy-peer-deps with React 19`);
    }
  }

  if (peers.next) {
    if (!peers.next.includes('15') && !peers.next.includes('*') && !peers.next.includes('>=14') && !peers.next.includes('>=15')) {
      notes.push(`Peer next: "${peers.next}" specifies older Next.js constraint`);
    }
  }

  return notes;
}

async function analyzeDependencies() {
  console.log('🔍 Analyzing dependencies in package.json against npm registry...\n');

  const pkgPath = path.join(rootDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error('❌ package.json not found!');
    process.exit(1);
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = pkgJson.dependencies || {};
  const devDeps = pkgJson.devDependencies || {};

  const allPackages = [
    ...Object.entries(deps).map(([name, ver]) => ({ name, current: ver, type: 'dependency' })),
    ...Object.entries(devDeps).map(([name, ver]) => ({ name, current: ver, type: 'devDependency' })),
  ];

  console.log(`Found ${allPackages.length} packages (${Object.keys(deps).length} dep, ${Object.keys(devDeps).length} devDep)\n`);

  const results = [];

  for (const pkg of allPackages) {
    process.stdout.write(`Checking ${pkg.name}... `);
    const info = await getPackageLatestInfo(pkg.name);
    
    const currClean = cleanVersion(pkg.current);
    const isUpToDate = currClean === info.latestVersion;
    const compatibilityNotes = isNext15Compatible(pkg.name, info);

    let status = 'UP_TO_DATE';
    if (info.error) {
      status = 'ERROR';
    } else if (!isUpToDate) {
      status = 'OUTDATED';
    }

    results.push({
      name: pkg.name,
      type: pkg.type,
      current: pkg.current,
      latest: info.latestVersion,
      status,
      compatibilityNotes,
      error: info.error,
    });

    console.log(
      isUpToDate
        ? `✅ Up-to-date (${pkg.current})`
        : `⚠️ Outdated (Current: ${pkg.current} -> Latest: ${info.latestVersion})`
    );
  }

  console.log('\n================================================================================');
  console.log('                            DEPENDENCY ANALYSIS REPORT                          ');
  console.log('================================================================================\n');

  console.table(
    results.map((r) => ({
      Package: r.name,
      Type: r.type === 'dependency' ? 'prod' : 'dev',
      Current: r.current,
      Latest: r.latest,
      Status: r.status,
      'Next.js 15 Notes': r.compatibilityNotes.join('; ') || 'OK',
    }))
  );

  const reportData = {
    timestamp: new Date().toISOString(),
    nextVersion: deps['next'] || 'Not Installed',
    reactVersion: deps['react'] || 'Not Installed',
    totalPackages: results.length,
    upToDateCount: results.filter((r) => r.status === 'UP_TO_DATE').length,
    outdatedCount: results.filter((r) => r.status === 'OUTDATED').length,
    packages: results,
  };

  const reportPath = path.join(rootDir, 'dependency-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n📄 Detailed JSON report written to: ${reportPath}`);

  // Summary message
  console.log(`\n📊 Summary:`);
  console.log(`   - Next.js Version: ${deps['next'] || 'N/A'}`);
  console.log(`   - React Version: ${deps['react'] || 'N/A'}`);
  console.log(`   - Total Packages Analyzed: ${results.length}`);
  console.log(`   - Up to Date: ${reportData.upToDateCount}`);
  console.log(`   - Outdated: ${reportData.outdatedCount}`);

  if (reportData.outdatedCount > 0) {
    console.log(`\n💡 Recommended updates for Next.js 15+ compatibility:`);
    results
      .filter((r) => r.status === 'OUTDATED')
      .forEach((r) => {
        console.log(`   • ${r.name}: ${r.current} ➔ ${r.latest}`);
      });
  }
}

analyzeDependencies().catch((err) => {
  console.error('Fatal error during analysis:', err);
  process.exit(1);
});

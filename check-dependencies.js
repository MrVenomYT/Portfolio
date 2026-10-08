import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanVersionStr(ver) {
  return ver ? ver.replace(/^[\^~>=<]+/, '') : '';
}

async function fetchNpmInfo(packageName) {
  try {
    const encodedName = packageName.startsWith('@')
      ? `@${encodeURIComponent(packageName.slice(1))}`
      : encodeURIComponent(packageName);

    const res = await fetch(`https://registry.npmjs.org/${encodedName}`, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const latestVersion = data['dist-tags']?.latest || 'Unknown';
    const latestMeta = data.versions?.[latestVersion] || {};

    return {
      latestVersion,
      peerDependencies: latestMeta.peerDependencies || {},
      dependencies: latestMeta.dependencies || {},
    };
  } catch (err) {
    return {
      latestVersion: 'Error',
      error: err.message,
    };
  }
}

function evaluateNext15Compat(pkgName, currentVer, latestInfo) {
  const peers = latestInfo.peerDependencies || {};
  let compatStatus = '✅ Fully Compatible';
  let priority = 'Low';

  // Core framework dependencies
  if (['next', 'react', 'react-dom'].includes(pkgName)) {
    priority = 'High';
    if (pkgName === 'next' && !currentVer.startsWith('15')) {
      compatStatus = '⚠️ Requires Next.js 15+ Upgrade';
    } else {
      compatStatus = '✅ Core Next.js 15 Stack';
    }
  } else if (['@types/react', '@types/react-dom', 'framer-motion', 'tailwindcss', 'lucide-react', 'firebase'].includes(pkgName)) {
    priority = 'High';
    if (peers.react && !peers.react.includes('19') && !peers.react.includes('*') && !peers.react.includes('>=18')) {
      compatStatus = '⚠️ Check React 19 Peer Spec';
    } else {
      compatStatus = '✅ Next 15 / React 19 Verified';
    }
  } else {
    if (peers.react && !peers.react.includes('19') && !peers.react.includes('*') && !peers.react.includes('>=18')) {
      priority = 'Medium';
      compatStatus = '⚠️ Strict React Peer Constraint';
    }
  }

  return { compatStatus, priority };
}

async function checkDependencies() {
  console.log('\n================================================================================');
  console.log('         PACKAGE DEPENDENCY CHECKER (PRIORITIZING NEXT.JS 15+ COMPATIBILITY)    ');
  console.log('================================================================================\n');

  const pkgPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error('❌ package.json not found in root directory.');
    process.exit(1);
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = pkgJson.dependencies || {};
  const devDeps = pkgJson.devDependencies || {};

  const allDeps = [
    ...Object.entries(deps).map(([name, ver]) => ({ name, current: ver, type: 'prod' })),
    ...Object.entries(devDeps).map(([name, ver]) => ({ name, current: ver, type: 'dev' })),
  ];

  console.log(`Checking ${allDeps.length} installed packages against npm registry...\n`);

  const results = [];

  for (const item of allDeps) {
    const info = await fetchNpmInfo(item.name);
    const currClean = cleanVersionStr(item.current);
    const isOutdated = info.latestVersion !== 'Error' && currClean !== info.latestVersion;
    const { compatStatus, priority } = evaluateNext15Compat(item.name, item.current, info);

    results.push({
      Package: item.name,
      Type: item.type,
      'Current Version': item.current,
      'Latest Version': info.latestVersion,
      IsOutdated: isOutdated,
      Status: isOutdated ? '⚠️ Outdated' : '✅ Up to Date',
      'Next.js 15+ Compat': compatStatus,
      Priority: priority,
    });
  }

  // Sort results: High priority & Outdated first
  results.sort((a, b) => {
    const priorityScore = { High: 3, Medium: 2, Low: 1 };
    const scoreA = (priorityScore[a.Priority] || 0) * 10 + (a.IsOutdated ? 5 : 0);
    const scoreB = (priorityScore[b.Priority] || 0) * 10 + (b.IsOutdated ? 5 : 0);
    return scoreB - scoreA;
  });

  const displayTable = results.map(({ IsOutdated, ...rest }) => rest);
  console.table(displayTable);

  const outdatedList = results.filter((r) => r.IsOutdated);
  const highPriorityOutdated = outdatedList.filter((r) => r.Priority === 'High');

  console.log('\n📊 Summary Report:');
  console.log(`   - Total Packages Analyzed: ${results.length}`);
  console.log(`   - Up to Date: ${results.length - outdatedList.length}`);
  console.log(`   - Outdated: ${outdatedList.length}`);
  console.log(`   - High Priority Outdated (Next.js 15 Ecosystem): ${highPriorityOutdated.length}`);

  if (outdatedList.length > 0) {
    console.log('\n🚀 Recommended Actions:');
    if (highPriorityOutdated.length > 0) {
      console.log('\n🔥 High Priority Updates (Core Next.js 15 Stack):');
      highPriorityOutdated.forEach((p) => {
        console.log(`   • ${p.Package}: ${p['Current Version']} ➔ ${p['Latest Version']}`);
      });
    }

    const otherOutdated = outdatedList.filter((r) => r.Priority !== 'High');
    if (otherOutdated.length > 0) {
      console.log('\n📦 Other Available Updates:');
      otherOutdated.forEach((p) => {
        console.log(`   • ${p.Package}: ${p['Current Version']} ➔ ${p['Latest Version']}`);
      });
    }
  } else {
    console.log('\n🎉 All packages are up to date and compatible with Next.js 15+!');
  }

  console.log('\n================================================================================\n');
}

checkDependencies().catch((err) => {
  console.error('Error executing check-dependencies.js:', err);
  process.exit(1);
});

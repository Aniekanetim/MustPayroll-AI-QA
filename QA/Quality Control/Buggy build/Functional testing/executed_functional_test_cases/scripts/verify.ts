import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { applicationDirectory, executionDirectory, readBuildManifest } from './build';

const sha = (v: string | Buffer) => createHash('sha256').update(v).digest('hex');
async function run(args: string[]) {
  const child = spawn(process.execPath, args, { cwd: executionDirectory, env: process.env, stdio: 'inherit' });
  return await new Promise<number | null>((done, reject) => { child.on('error', reject); child.on('close', done); });
}
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, 'Use npm run verify from this execution folder.');
assert.equal(await run([npmCli, 'run', 'build:app']), 0, 'Application build failed.');
const build = await readBuildManifest();
const files = ['package.json', 'package-lock.json', 'tsconfig.json', 'playwright.config.ts', 'scripts/build.ts', 'scripts/verify.ts',
 'test/helpers.ts', 'test/specs/ui/payroll-ui.spec.ts', ...['payroll','pay-runs','earnings','payments','notifications'].map(n => `test/pages/${n}-page.ts`)];
const qaFiles: Record<string,string> = {};
for (const file of files.sort()) qaFiles[file] = sha(await readFile(resolve(executionDirectory,file)));
const browser = await chromium.launch({ channel: 'chromium' });
const environment = { node: process.version, platform: process.platform, chromium: browser.version() };
await browser.close();
const startedAt = new Date().toISOString();
const exitCode = await run(['node_modules/@playwright/test/cli.js','test','--config','playwright.config.ts']);
const finishedAt = new Date().toISOString();
const reportPath = resolve(executionDirectory,'data/playwright/report.json');
const report = JSON.parse(await readFile(reportPath,'utf8'));
function flatten(suite: any): any[] { return [...suite.specs, ...(suite.suites ?? []).flatMap(flatten)]; }
const specs: any[] = report.suites.flatMap(flatten);
assert.deepEqual(specs.map(s=>s.title.split(' | ')[0]).sort(), ['TC01','TC02','TC05','TC06','TC07','TC08']);
assert.equal(report.errors.length,0,'Runner errors are not business-defect evidence.');
async function attachment(spec: any,name: string) {
 const a=spec.tests[0].results[0].attachments.find((v:any)=>v.name===name);assert.ok(a,`Missing ${name}`);
 return JSON.parse((a.body ? Buffer.from(a.body,'base64') : await readFile(a.path)).toString());
}
const failed = specs.filter(s=>s.tests[0].results[0].status==='failed').map(s=>s.title.split(' | ')[0]).sort();
assert.deepEqual(failed,build.variant==='faulty'?['TC07']:[],'Unexpected failure set.');
assert.equal(exitCode,build.variant==='faulty'?1:0);
const observations: Record<string,any> = {};
for(const spec of specs) {
 assert.equal(spec.tests.length,1);assert.equal(spec.tests[0].results.length,1,'No runner retry may hide a failure.');
 assert.ok(['passed','failed'].includes(spec.tests[0].results[0].status),'No skipped/timed-out cases.');
 const o=await attachment(spec,'case-observation');const id=spec.title.split(' | ')[0];observations[id]=o;
 assert.equal(o.channel,'ui');
 assert.ok(o.browserRequests.some((r:any)=>r.path.endsWith('/pay-runs')),'Payroll must be driven through the browser.');
 for(const r of o.browserRequests.filter((r:any)=>r.path.endsWith('/pay-runs'))) assert.equal(r.body.simulatedProcessingAt,r.body.scheduledPayRunAt);
 for(const [uiKey,stateKey] of [['uiFirst','first'],['uiAfter','after']]) {
  if(!o[uiKey]) continue;
  const ui=o[uiKey],state=o[stateKey];assert.ok(state);
  assert.equal(state.currency,'USD');assert.equal(Math.round(Number(ui.payRun.recorded.replace(/[^0-9.]/g,''))*100),state.recordedPaymentTotalCents);
  assert.deepEqual(ui.payments.records.map((p:any)=>p.reference).sort(),state.payments.map((p:any)=>p.paymentId).sort());
 }
}
const o=observations.TC07;
assert.equal(o.first.payments.length,1);assert.equal(o.first.notifications.length,1);
assert.equal(o.first.notifications[0].deliveryStatus,'pending');
assert.equal(o.after.recordedPaymentTotalCents,build.variant==='faulty'?300000:150000);
assert.equal(o.after.payments.length,build.variant==='faulty'?2:1);
assert.equal(o.after.notifications.length,build.variant==='faulty'?2:1);
assert.ok(o.after.payments.some((p:any)=>p.paymentId===o.first.payments[0].paymentId),'Original payment disappeared.');
if(build.variant==='faulty') {
 const error=specs.find(s=>s.title.startsWith('TC07 |')).tests[0].results[0].error.message;
 assert.ok(error.includes('1,500.00') && error.includes('3,000.00'),'Failure must be the duplicate amount, not a locator or timeout.');
}
const health=await attachment(specs.find(s=>s.title.startsWith('TC07 |')),'served-build');
assert.equal(health.build.id,build.id);assert.equal(health.build.sourceSha256,build.sourceFingerprint);
for(const [file,hash] of Object.entries(build.fileSha256)) assert.equal(sha(await readFile(resolve(applicationDirectory,file))),hash,`Build changed: ${file}`);
for(const [file,hash] of Object.entries(qaFiles)) assert.equal(sha(await readFile(resolve(executionDirectory,file))),hash,`Test changed: ${file}`);
const summary={startedAt,finishedAt,build:{id:build.id,sourceFingerprint:build.sourceFingerprint},environment,
 qaSourceFingerprint:sha(JSON.stringify(qaFiles)),exitCode,
 cases:specs.map(s=>({id:s.title.split(' | ')[0],title:s.title,status:s.tests[0].results[0].status,error:s.tests[0].results[0].error?.message,observations:observations[s.title.split(' | ')[0]]}))};
await mkdir(resolve(executionDirectory,'data/playwright'),{recursive:true});
await writeFile(resolve(executionDirectory,'data/playwright/verified-run.json'),JSON.stringify(summary,null,2)+'\n');
console.log(`Verified ${build.id}: ${6-failed.length} passed / ${failed.length} failed. TC07's expected business assertion is unchanged across builds.`);
console.log('A successful verification command checks the expected failure signature; it does not turn a faulty-build test into a Pass. API TC03/TC04 are separate.');

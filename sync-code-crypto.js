const { performance, PerformanceObserver } = require('node:perf_hooks');
const appStart = performance.now();
const crypto = require('crypto');

const NUM_REQUESTS = 2;

for (let i = 0; i < NUM_REQUESTS; i++) {
  console.log('Encryption start time', performance.now() / 1000);
  const key = crypto.pbkdf2Sync('secret', 'salt', 1000000, 512, 'sha512');
  console.log('Encryption end time', performance.now() / 1000);
  console.log(key);
}
const appEnd = performance.now();

console.log('App End time', appEnd / 1000);

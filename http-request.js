const { performance, PerformanceObserver } = require('node:perf_hooks');
const OS = require('os');
const https = require('https');
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

console.log('My core check', process.env.UV_THREADPOOL_SIZE);
const appStart = performance.now();
console.log('App Start time', appStart / 1000);

const NUM_REQUESTS = 50;

const roundFixed = (number) => (number / 1000).toFixed(4);
// 50 request - some in 3 s and some in 30 sec indicates that network adaptor has limitations
for (let i = 0; i < NUM_REQUESTS; i++) {
  console.log(`Network start time ${i}`, roundFixed(performance.now()));
  //https://nebri.us/static/me.jpg
  https
    .request('https://nebri.us/static/me.jpg', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(`Network end time ${i}`, roundFixed(performance.now()));
      });
    })
    .end();
}
const appEnd = performance.now();

console.log('App End time', appEnd / 1000);

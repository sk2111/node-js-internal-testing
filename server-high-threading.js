const OS = require('os');
const http = require('http');
const url = require('url');

let reqId = 0;

//process.env.UV_THREADPOOL_SIZE = OS.cpus().length;
process.env.UV_THREADPOOL_SIZE = 1024;

console.log('My core check', process.env.UV_THREADPOOL_SIZE);
const { performance, PerformanceObserver } = require('node:perf_hooks');
const appStart = performance.now();
console.log('App Start time', appStart / 1000);
const crypto = require('crypto');

const roundFixed = (number) => (number / 1000).toFixed(4);

function spwanCrypto(reqId) {
  const NUM_REQUESTS = 100;
  for (let i = 0; i < NUM_REQUESTS; i++) {
    console.log(
      `Encryption start time ${reqId} - ${i}`,
      roundFixed(performance.now()),
    );
    crypto.pbkdf2('secret', 'salt', 1000000, 512, 'sha512', () => {
      console.log(
        `Encryption end time ${reqId} -${i}`,
        roundFixed(performance.now()),
      );
    });
  }
}

http
  .createServer(function (req, res) {
    spwanCrypto(reqId);
    reqId++;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const q = url.parse(req.url, true).query;
    const txt = q.year + ' ' + q.month;
    res.end(txt);
  })
  .listen(8080);

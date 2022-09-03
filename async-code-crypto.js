const OS = require('os');
//process.env.UV_THREADPOOL_SIZE = OS.cpus().length;
process.env.UV_THREADPOOL_SIZE = 8;

console.log('My core check', process.env.UV_THREADPOOL_SIZE);
const { performance, PerformanceObserver } = require('node:perf_hooks');
const appStart = performance.now();
console.log('App Start time', appStart / 1000);
const crypto = require('crypto');

const NUM_REQUESTS = 100;

const roundFixed = (number) => (number / 1000).toFixed(4);

for (let i = 0; i < NUM_REQUESTS; i++) {
  console.log(`Encryption start time ${i}`, roundFixed(performance.now()));
  crypto.pbkdf2('secret', 'salt', 1000000, 512, 'sha512', () => {
    console.log(`Encryption end time ${i}`, roundFixed(performance.now()));
  });
}
const appEnd = performance.now();

console.log('App End time', appEnd / 1000);

/* Observation
  
  Iteration is 2 and libuv thread pool size by default 4
  
    0.03s  => 4.4s
    0.03s  => 4.4s

  Iteration is 4 and libuv thread pool size by default 4

    0.04s  => 4.5s 
    0.04s  => 4.5s 
    0.04s  => 4.5s 
    0.04s  => 4.5s 

  Iteration is 6 and libuv thread pool size by default 4

  0.04s  => 4.5s 
  0.04s  => 4.5s 
  0.04s  => 4.5s 
  0.04s  => 4.5s 

  0.4s   => 9.0s
  0.4s   => 9.0s

  Iteration is 8 and libuv thread pool size by default 4

  0.04s  => 4.5s 
  0.04s  => 4.5s 
  0.04s  => 4.5s 
  0.04s  => 4.5s 
  // after threads come back it assign to other two until then it waits in queue
  0.04s   => 9.0s
  0.04s   => 9.0s
  0.04s   => 9.0s
  0.04s   => 9.0s


  Iteration is 8 and libuv thread pool size increase to 8 because this mac has 8 core

  0.04s  => 5.4s 
  0.04s  => 5.4s 
  0.04s  => 5.4s 
  0.04s  => 5.4s 
  0.04s   => 5.4s
  0.04s   => 5.4s
  0.04s   => 5.4s
  0.04s   => 5.4s


  When we set the libuv thread to more than number of cores say 1024

  What happens is if we iterate for 100 runs then 100 libuv threads created and it is perfectly
  fine from node js prepective 

    But due to 8 core and 100 threads are waiting 
      CPU will try to switch between threads to perform concurrent mode
      Thus switching between 100 threads and equally allocate time span for all of them
      so all of the threads will complete in more or less in same time thus causing collective delay

      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
      0 => 60s
*/

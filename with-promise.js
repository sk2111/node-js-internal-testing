setTimeout(function () {
  console.log('TIMEOUT 1');
  setImmediate(function () {
    console.log('SETIMMEDIATE 1');
  });
  Promise.resolve(12).then(() => {
    console.log('I am Promise resolve 1');
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT TICK 1');
    setTimeout(() => {
      console.log('Timeout inside nexttick');
    }, 0);
    process.nextTick(() => {
      console.log('I am process next ticker');
    });
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT FLUD 1');
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT FLUD 1');
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT FLUD 1');
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT FLUD 1');
  });
  Promise.resolve(12).then(() => {
    console.log('I am Promise resolve 2');
  });
  console.log('I am log');
}, 10);

setTimeout(function () {
  console.log('TIMEOUT 2');
  process.nextTick(() => {
    console.log('PROCESS NEXT TICK 2');
  });
  Promise.resolve(12).then(() => {
    console.log('I am Promise resolve 2');
  });
  setImmediate(function () {
    console.log('SETIMMEDIATE 2');
  });
  for (let i = 0; i < 50000000000; i++) {}
}, 10);

setTimeout(function () {
  console.log('TIMEOUT 3');
  Promise.resolve(12).then(() => {
    console.log('I am Promise resolve 3');
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT TICK 3');
  });

  setImmediate(function () {
    console.log('SETIMMEDIATE 3');
  });
}, 10);

/*

    1) Next tick runs before promise and the former run before the event loop current operation
    or before it moves to next phase

*/

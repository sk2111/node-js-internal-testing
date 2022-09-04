setTimeout(function () {
  console.log('TIMEOUT 1');
  setImmediate(function () {
    console.log('SETIMMEDIATE 1');
  });
  process.nextTick(() => {
    console.log('PROCESS NEXT TICK 1');
  });
}, 10);

setTimeout(function () {
  console.log('TIMEOUT 2');
  process.nextTick(() => {
    console.log('PROCESS NEXT TICK 2');
  });
  setImmediate(function () {
    console.log('SETIMMEDIATE 2');
  });
}, 10);

setTimeout(function () {
  console.log('TIMEOUT 3');
  process.nextTick(() => {
    console.log('PROCESS NEXT TICK 3');
  });
  setImmediate(function () {
    console.log('SETIMMEDIATE 3');
  });
}, 10);

/*
    TIMEOUT 1
    PROCESS NEXT TICK 1
    TIMEOUT 2
    PROCESS NEXT TICK 2
    TIMEOUT 3
    PROCESS NEXT TICK 3
    SETIMMEDIATE 1
    SETIMMEDIATE 2
    SETIMMEDIATE 3

*/

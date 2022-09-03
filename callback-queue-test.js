for (let i = 0; i < 10000000000; i++) {}

setTimeout(() => {
  console.log('I am settimeout 10ms');
}, 100000);
Promise.resolve('h011').then((data) => console.log('Promise', data));

for (let i = 0; i < 10000000000; i++) {}

Promise.resolve('h022').then((data) => console.log('Promise', data));

for (let i = 0; i < 10000000000; i++) {}

setTimeout(() => {
  console.log('I am settimeout 0ms');
}, 0);

for (let i = 0; i < 10000000000; i++) {}

Promise.resolve('h033').then((data) => console.log('Promise', data));
console.log('I am exit');

let i = 0;
function foo() {
  i++;
  if (i > 20) {
    return;
  }
  console.log('foo', i);
  let j = i;
  setTimeout(() => {
    console.log('setTimeout', j);
  }, 0);
  process.nextTick(foo);
}

setTimeout(foo, 2);
setTimeout(() => {
  console.log('Other setTimeout');
}, 2);
console.log('I am end');

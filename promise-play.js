const add = (a, b, delay) => {
  console.log('I am add function', a, b); //1
  return new Promise((resolve, reject) => {
    console.log('I am Promise function executor add', a, b); // 2
    setTimeout(() => {
      console.log('I am settimeout add', a, b); //6
      resolve(a + b);
    }, delay);
  });
};

const sub = async (a, b, delay) => {
  console.log('I am sub function', a, b); // 4
  const ba = await Promise.resolve(4);
  console.log('I am after effect');
  return new Promise((resolve, reject) => {
    console.log('I am Promise function executor sub', a, b); // 5
    setTimeout(() => {
      console.log('I am settimeout sub', a, b); //7
      resolve(a + b);
    }, delay);
  });
};
const subtract = (a, b, delay) => {
  console.log('I am subract function', a, b); // 3
  return sub(a, b, delay);
};

const check = [add(1, 2, 3000), subtract(2, 5, 5000)];

console.log(check); // 0

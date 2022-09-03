console.log('Starting the script');

const promise = new Promise((resolve, reject) => {
  console.log('Testing promise executor');

  setTimeout(() => {
    resolve('Cat is good');
  }, 3000);
});

promise
  .then((result) => {
    console.log('Starting the promise then');
    for (let i = 0; i < 5000000000; i++) {}

    return new Promise((res) => {
      setTimeout(() => {
        res(result + 'soup');
      }, 1000);
    }).then((res) => {
      console.log('Setimeout then');
      for (let i = 0; i < 5000000000; i++) {}
      return 'sathish is god boy';
    });
  })

  .then((res) => {
    console.log('I am thenable');
    console.log(res);
  });

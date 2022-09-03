const https = require('node:https');

https
  .get('https://www.google.com/', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  })
  .on('error', (e) => {
    console.error(e);
  });

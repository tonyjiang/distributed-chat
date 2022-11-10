const http = require('http');
const express = require('express');
const expressApp = express();


expressApp.get('/', (req, res) => {
  res.send('Hello World root!')
})

expressApp.get('/foo', (req, res) => {
  res.send('Hello World foo!')
})

expressApp.get('/bar', (req, res) => {
  res.send('Hello World bar!')
})


expressApp.listen(8888, () => {
  console.log(`Example app listening on port ${7777}`)
})
// http.createServer(expressApp).listen(8888);

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8888);

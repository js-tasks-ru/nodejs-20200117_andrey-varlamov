'use strict';

const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');


const server = new http.Server();

server.on('request', (req, res) => {
  console.log(url.parse(req.url));
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);
  const fileToSend = fs.createReadStream(filepath);
  fileToSend.on('error', (e) => {
    if (e.code === 'ENOENT') {
      if (path.dirname(pathname).length > 1) {
        res.statusCode = 400;
        res.end('статус код ответа 400');
      }
      res.statusCode = 404;
      res.end('статус код ответа 404');
    }
  });
  switch (req.method) {
    case 'GET':
      res.statusCode = 200;
      fileToSend.pipe(res);
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;

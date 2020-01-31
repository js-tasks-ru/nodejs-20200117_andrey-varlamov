'use strict';

const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');
const server = new http.Server();

server.on('request', (req, res) => {

  if (req.method !== 'POST') {
    res.statusCode = 500;
    res.end('Not implemented!');
    return;
  }

  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);
  if (fs.existsSync(filepath)) {
    res.statusCode = 409;
    res.end('статус код ответа 409');
    return;
  }

  if (path.dirname(pathname).length > 1) {
    res.statusCode = 400;
    res.end('статус код ответа 400');
    return;
  }

  const writeStream = fs.createWriteStream(filepath);
  const limitStream = new LimitSizeStream({ limit: 1e6 });

  limitStream.on('error', (e) => {
    if (e.code === 'LIMIT_EXCEEDED') {
      res.statusCode = 413;
      res.end('LIMIT_EXCEEDED');
    }
  });

  writeStream.on('error', (error) => {

  });

  req.on('error', (error) => {

  });

  res.on('error', (error) => {

  });

  res.on('close', () => {
    if (!writeStream.writableFinished) {
      fs.unlinkSync(filepath);
    }
  });

  writeStream.on('finish', () => {
    res.statusCode = 201;
    res.end(`${pathname} was created!`);
  });

  req.pipe(limitStream).pipe(writeStream);
});

module.exports = server;


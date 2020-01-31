'use strict';

const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.buffer = [];
  }

  _transform(chunk, encoding, callback) {
    // если убрать spread оператор в ...chunk
    // тест всеравно проходит а в out helloworld
    this.buffer.push(...chunk);
    if (this.buffer.length > this.limit) {
      callback(new LimitExceededError());
    } else {
      // вызов метода callback(null, data)
      // посути передает дату в this.push
      // this.push(chunk);
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;

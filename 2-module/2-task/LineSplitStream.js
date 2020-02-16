const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.enc = options.encoding;
    this.bufferStr = '';
  }

  _transform(chunk, encoding, callback) {
    encoding = this.enc;
    const _chunk = chunk.toString(encoding);
    this.bufferStr += _chunk;
    callback();
  }

  _flush(callback) {
    const sendArray = this.bufferStr.split(os.EOL);
    sendArray.forEach((chunk) => this.push(chunk));
    callback();
  }
}

module.exports = LineSplitStream;

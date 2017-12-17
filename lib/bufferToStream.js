const stream = require("stream");


const bufferToStream = function (buffer) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(new Buffer(buffer));
    return bufferStream;
};
module.exports = bufferToStream;
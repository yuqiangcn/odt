const streamToBuffay = function (stream) {
    const Buffer = require("buffer").Buffer;
    return new Promise((resolve, reject) => {
        if (!stream.readable) {
            return resolve([]);
        }

        const arr = [];
        const ondata = function (chunk) {
            arr.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        };

        const onEnd = function () {
            resolve(arr[0]);
        };

        const onError = function (err) {
            reject(err);
        };

        stream.on("data", ondata);
        stream.on("close", onEnd);
        stream.on("error", onError);
    });
};

module.exports = streamToBuffay;
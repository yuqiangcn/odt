const Q = require("bluebird");
const JSZip = require('jszip');
const objFlatten = require("./flattenObj");
// const convert = Q.promisify(require('unoconv2').convert);
// const uuid = require("node-uuid");
// const os = require("os");
// const fs = require("fs");
// const path = require("path");
// const pdftk = require("node-pdftk");
const streamToBuffer = require("./streamToBuffer");
const bufferToStream = require("./bufferToStream");

class OdtTemplateContrat {
    constructor(templateBuffer) {
        this.templateBuffer = templateBuffer;
        this.docName = null;
    }
}

OdtTemplateContrat.prototype.streamToBuffay = Q.coroutine(function* () {
    this.templateBuffer = yield streamToBuffer(this.templateBuffer);
    return this;
});

OdtTemplateContrat.prototype.renderDoc = Q.coroutine(function* (data, { type }) {
    const _data = objFlatten(data);
    let _content = "";

    if (!Buffer.isBuffer(this.templateBuffer)) {
        yield this.streamToBuffay();
    }

    const zip = new JSZip();
    const newzip = yield zip.loadAsync(this.templateBuffer);

    //remplace
    yield newzip.file("content.xml")
        .async("string")
        .then((content) => {
            _content = content.replace(/{(?:<[^}]*>)?([^}>]+)(?:<[^}]*>)?}/gm, (m, n) => n = _data[n.trim()] || "");
        });

    newzip.remove("content.xml");
    newzip.file("content.xml", _content);
    switch (type) {
        case "nodebuffer":
            return newzip.generateAsync({ type: 'nodebuffer' });
        case "base64":
            return newzip.generateAsync({ type: 'base64' });
        case "stream":
            const buffer = yield newzip.generateAsync({ type: 'nodebuffer' });
            return Q.resolve(bufferToStream(buffer));
        default:
            return newzip.generateAsync({ type: 'nodebuffer' });

    }
});


// OdtTemplateContrat.prototype.toPdf = Q.coroutine(function* () {
//     this.docName = uuid.v4();
//     yield Promise.resolve(fs.writeFile(path.resolve(os.tmpdir(), `${this.docName}.odt`), this.templateBuffer));
//     return yield new Promise((resolve) => {
//         convert(path.resolve(os.tmpdir(), `${this.docName}.odt`), 'pdf', null, () => resolve(fs.unlink(path.resolve(os.tmpdir(), `${this.docName}.odt`))));
//     });


// });

// OdtTemplateContrat.prototype.concatPdf = Q.coroutine(function* (fileList) {
//     if (!Array.isArray(fileList) || !fileList.length) {
//         throw new Error("Should be an array.");
//     }
//     const docNamePath = { 65: path.resolve(os.tmpdir(), `${this.docName}.pdf`) };
//     fileList.map((v, k) => Object.assign(docNamePath, { [66 + k]: v }));

//     return yield new Promise((resolve, reject) => {
//         pdftk
//             .input(docNamePath)
//             .cat(Object.keys(docNamePath).map((v) => String.fromCharCode(v)).join(" "))
//             .output()
//             .then((buffer) => {
//                 // Do stuff with the output buffer
//                 fileList.map((v) => fs.unlink(v));
//                 resolve(buffer);
//             })
//             .catch((err) => {
//                 // handle errors
//                 console.log(err);
//                 reject(err);
//             });
//     });
// });

module.exports = OdtTemplateContrat;
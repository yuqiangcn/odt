const http = require('http');
const fs = require("fs");
const os = require("os");
const path = require("path");
const hostname = '127.0.0.1';
const port = 8088;

const odt = require("./../lib/index");

const server = http.createServer((req, res) => {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on("end",()=>{
        body.pipe(fs.createWriteStream(path.resolve(os.homedir(),'test.txt')));
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});




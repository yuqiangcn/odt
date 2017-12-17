
const fs = require("fs");
const path = require("path");

const odtTemplate = require("./../lib/index");
const uuid = require("node-uuid");

const file = fs.createReadStream(path.resolve("./test", "test.odt"));

const odtHandle = new odtTemplate(file);
const data = {
    nom: "YU",
    prenom: "Qiang"
};

odtHandle
    .renderDoc(data, { type: "stream" })
    .then((t2) => {
        // fs.writeFileSync(path.resolve(path.resolve("./test", `${uuid.v4()}.odt`)), t2);
        t2.pipe(fs.createWriteStream(path.resolve(path.resolve("./test", `${uuid.v4()}.odt`))));
        odtHandle.toPdf();
    });



# node-odt

OpenDocument Text(.odt) generator working with templates and data (like Mustache)

## Install

```
  $ npm install node-odt
```

## Usage

In the template:
```odt
Prenom: {prenom},
Nom: {nom}
```

Code:
```js

const fs = require("fs");
const path = require("path");

const odtTemplate = require("./../lib/index");
const uuid = require("node-uuid");

const file = fs.createReadStream(path.resolve("./test", "test.odt"));

const odtHandle = new odtTemplate(file);
const data = {
    nom: "Docy",
    prenom: "Daniel"
};


//type: "nodebuffer", "base64", "stream"
odtHandle
    .renderDoc(data, { type: "stream" })
    .then((t2) => {
        // fs.writeFileSync(path.resolve(path.resolve("./test", `${uuid.v4()}.odt`)), t2);
        t2.pipe(fs.createWriteStream(path.resolve(path.resolve("./test", `${uuid.v4()}.odt`))));
        odtHandle.toPdf();
    });


```
Output odt file:
```odt
Prenom: Daniel,
Nom: Docy
```


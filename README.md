
# node-odt

OpenDocument Text(.odt) generator working with templates and data (like Mustache)

## Install

```
  $ npm install node-odt
```

## Usage

Template:
```odt
Prenom: {prenom},
Nom: {nom},
Numero: {contact_numero}
```

Code:
```js


const data = {
    nom: "Docy",
    prenom: "Daniel",
    contact:{
        numero:"12345678"
    }
};

const file = fs.createReadStream(path.resolve("./test", "test.odt"));

//file can be a stream or a buffer
const odtHandle = new odtTemplate(file);

//Output type: "nodebuffer", "base64", "stream"
odtHandle
    .renderDoc(data, { type: "stream" })
    .then((res) => {
        // fs.writeFileSync("output.odt", res);
        res.pipe(fs.createWriteStream("output.odt"));
    });


```
Output odt file:
```odt
Prenom: Daniel,
Nom: Docy,
Numero: 12345678
```
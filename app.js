// const {create} = require("ipfs-http-client");
// const fs = require("fs");
// const path = require("path");

// const express = require("express");
// const app = express();


// const client = create('https://127.0.0.1:5002')

// app.get('/', (req,res) => {
//     res.render('home');
// });

// app.post('/upload', (req, res) => {
//     const file = req.files.file;
//     const fileName = req.body.fileName;
//     const filePath = '/files';

//     file.mv(filePath, async(err)=>{
//         if(err) {
//             console.log('error');
//             return res.status(500).send(err);
//         }
//         const fileHash = await addFile(fileName, filePath);
//         fs.unlink(filePath,"utf8", (err,data) => {
//             if(err) console.log(err);
//         });

//         res.render('upload', { fileName, fileHash});
//     });
//   });

// const add =  async(fileName,filePath) => {
//     const file = fs.readFileSync(filePath);
//     const fileAdded = await ipfs.add({path:fileName, content:file});
//     const fileHash = fileAdded.hash;
//     return fileHash;
// }

// add();

// app.listen(3000,() =>{
//     console.log('App running in 3000 port');
// });
const {create} = require("ipfs-http-client");
const fs = require("fs");
async function ipfsClient(){
    const ipfs = await create(
        {
            host:"ipfs.infura.io",
            port:5001,
            protocol:"https"
        }
    );
    return ipfs;

}

async function saveText(){
    let ipfs = await ipfsClient();
    let result = await ipfs.add("hello");
    console.log(result);
}
// saveText();

async function saveFile() {

    let ipfs = await ipfsClient();

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    console.log(result)
}
saveFile()

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}
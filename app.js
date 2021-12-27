const {create} = require("ipfs-http-client");
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();


const client = create('https://127.0.0.1:5002')

app.get('/', (req,res) => {
    res.render('home');
});

app.post('/upload', (req, res) => {
    const file = req.files.file;
    const fileName = req.body.fileName;
    const filePath = '/files';

    file.mv(filePath, async(err)=>{
        if(err) {
            console.log('error');
            return res.status(500).send(err);
        }
        const fileHash = await addFile(fileName, filePath);
        fs.unlink(filePath,"utf8", (err,data) => {
            if(err) console.log(err);
        });

        res.render('upload', { fileName, fileHash});
    });
  });

const add =  async(fileName,filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({path:fileName, content:file});
    const fileHash = fileAdded.hash;
    return fileHash;
}

add();

app.listen(3000,() =>{
    console.log('App running in 3000 port');
});

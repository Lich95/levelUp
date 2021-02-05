const fs = require('fs');

fs.readFile('./file.js','utf8',(err,doc)=>{
    console.log(err,doc)
})
fs.writeFile('./file.js','写入内容',err=>{
   if (err){ return console.log(err)}
   
})

const express = require("express");
const bodyParser = require('body-parser')


let app = express();
let PORT = 3030; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


let service = require('./service.js');

 //Get JSOn data   
 app.post('/data',service.data);

 app.get('/parent',service.parent);

 app.get('/child',service.child);

  app.get('/subject',service.subject);

  app.get('/childrenList',service.childrenList);

app.listen(PORT,()=>{console.log(`Express server is on port No. ${PORT}`)});
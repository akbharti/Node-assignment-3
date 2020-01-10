const fs = require('fs');
const formidable = require('formidable');

let da = require('./da.js');


// api 1
exports.data = (req,res) =>
{
    let obj = req.body;

    obj.forEach(o => {
        let {firstName,lastName,age,contact} = o;  
     
        da.insertParentInfo(firstName,lastName,age,contact,o)
    });
    
    res.json(obj);
}

// api 2
exports.parent = (req,res) =>
{
    let obj = req.body; 
    let pid =  obj.pid;
    da.parentID(pid,res)

   // res.send(obj)
}

// api 3
exports.child = (req,res) =>
{
    let obj = req.body; 
    let pid =  obj.pid;
    da.children(pid,res)

    // res.send(obj)
}


// api 4
exports.subject = (req,res) =>
{
    let obj = req.body; 
    let cid =  obj.cid;
    
    da.subject(cid,res)

    // res.send(obj)
}



// api 5
exports.childrenList = (req,res) =>
{
    let obj = req.body; 
   console.log(obj)
    da.childrenList(obj.paperName,res)

    //res.send(obj)
}
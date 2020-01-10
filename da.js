const mysql = require('mysql');
const util = require('util');

  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", 
    database: "info"
  });

   con.connect( (err) =>{
      if (err) throw err;
    });

    con.query = util.promisify(con.query)

      //Create parents info  
      exports.insertParentInfo =  async (firstName,lastName,age,contact,obj)=>{
        
        let sqlParentInsert = `INSERT INTO parent (firstName,lastName,age,contact) VALUES ('${firstName}','${lastName}','${age}','${contact}')`;  
        
        try{
          results = await con.query(sqlParentInsert )
          console.log("parent : ",JSON.stringify(results))
        }
        catch (err) {
        console.log(err)
      }

      let pid =  results.insertId
      console.log("pid ::" ,pid)

//children

      let childData = obj.childern;

      await childData.forEach(async childElement => {
        
        childFirstName = childElement.firstName;
        childLastName = childElement.lastName;
        childDob = childElement.dob;

        

        let sqlChildInsert = `INSERT INTO children (pid,firstName,lastName,dob) VALUES ('${pid}','${childFirstName}','${childLastName}','${childDob}')`;  
        
        try{
         let childResults = await con.query(sqlChildInsert )
          console.log("children : ",JSON.stringify(childResults))
        }
        catch (err) {
        console.log(err)
      }

      let cid =  results.insertId
      console.log("cid :::",cid)

      // subject

      // let subjects = childElement.subjects;

      // await subjects.forEach( async subjectsElement => {

      //   paperName = subjectsElement.paperName;
      //   marks = subjectsElement.marks;

      //   console.log(cid, paperName,marks)

      //   let sqlSubjectInsert = `INSERT INTO subjects (cid,paperName,marks) VALUES (${cid},'${paperName}','${marks}')`;  

      //   try{
      //  let   subjectResults = await con.query(sqlSubjectInsert )
      //     console.log("subjects : ",JSON.stringify(subjectResults))
      //   }
      //   catch (err) {
      //   console.log(err)
      // }

      // })

      });

     }

     exports.parentID =  async (pid,res)=>{

      let sqlparent = `SELECT p.firstName,p.lastName,p.age, COUNT(c.pid) AS 'count'
      FROM parent p, children c 
      WHERE p.pid = ${pid} AND c.pid = ${pid}
      GROUP BY c.pid
      `;  
    
      con.query(sqlparent,   (err, result, fields)=> {
        if (err) 
          console.log(sqlparent);

         else{
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
          }
      });
   
     }

     exports.children =  async (pid,res)=>{
       console.log(pid)

      let sqlChildren = `SELECT c.cid,c.firstName,c.lastname,c.dob
      FROM children c, parent p
      WHERE c.pid = p.pid 
      AND p.pid = ${pid}
      `;  
    
      con.query(sqlChildren,   (err, result, fields)=> {
        if (err) 
          console.log(sqlChildren);
          else{
            console.log(JSON.stringify(result));
            res.send((result));
          }
      });
   
     }

   //  4
     exports.subject =  async (cid,res)=>{
      console.log(cid)

     let sqlSubject = `SELECT c.cid,s.papername,s.marks
     FROM children c
     RIGHT JOIN subjects s USING (cid)
     WHERE s.cid = ${cid}
     `;  

     con.query(sqlSubject,   (err, result, fields)=> {
       if (err) 
         console.log(sqlSubject);
         else{
          console.log(JSON.stringify(result));
          res.send((result));
        }
     });
  
    }

   //  5 
     exports.childrenList =  async (paperName,res)=>{
      console.log(paperName)

      let sqlChildrenList = `SELECT DISTINCT p.firstName AS parentName,c.firstName AS childName,s.papername,s.marks
      FROM parent p,children c, subjects s
      WHERE  s.paperName = '${paperName}'
      `;  
    
      con.query(sqlChildrenList,   (err, result, fields)=> {
        if (err) console.log(err)
        else{
          console.log((result));
          res.send((result));
        }
      });
    }
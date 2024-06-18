const express = require("express");
const con = require("./js/connection");
const bodyparser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("style"));
app.set("view engine", "ejs");
app.use(bodyparser.json()); //--
app.use(bodyparser.urlencoded({ extended: true })); //--

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/js/signup.html");
});

app.get("/login-page", (req, res) => {
  res.sendfile(__dirname + "/js/login.html");
});

app.post('/add-data',(req,res)=>{
let name=req.body.name;
let email=req.body.email;
let pass=req.body.pass;

console.log(name + email + pass);

let sql=`insert login1 (name1,email,pass) values ("${name}","${email}","${pass}")`;

con.connect((err)=>{
  if(err) console.log(err);
})

con.query(sql,(err,result)=>{
  res.redirect("/facedet");
})
});

app.post('/check-data',(req,res)=>{
  let name=req.body.name;
  let pass=req.body.pass;
  
  con.connect((err)=>{
    if(err) console.log(err);
  });

  let sql=`select *from login1  where name1="${name}" and pass="${pass}"`;
  
  
  con.query(sql,(err,result)=>{
    console.log(result);
    if(result.length>0)
    res.redirect("/facedet");
  else res.redirect("/");
  })
  })

  app.get('/facedet', (req, res) => {
    res.redirect('http://127.0.0.1:5501/face-detection.html');
  });

app.listen(port);
const express = require("express")
const path = require("path")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const {v4:uuid4}=require("uuid")
const router= require('./router')
const nocache = require('nocache')
const port = 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(nocache())

app.set("view engine","ejs")


// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use(session({
  secret:uuid4(),
  resave:false,
  saveUninitialized:true
}))
app.use('/route',router)
// Home route


// app.get('/',(req,res)=>{
//   res.render('base',{title : "Login system"})
  
//   });


  app.get('/',(req,res)=>{
    if(!req.session.user){
       res.render("base", { title: "Login system" });
   
     }else{
       res.redirect('/route/dashboard');
     }
  })
// const url = require('url')
//   app.get('/hello',(req,res)=>{ 
//     res.send("hello"+req.query.user)
//   })
app.listen(port,()=>{
  console.log("loging system link http://localhost:3000");
})



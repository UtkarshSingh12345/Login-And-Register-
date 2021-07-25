const  express = require("express");

const server = express( );

const   bodyParser = require("body-parser");

server.use(bodyParser.urlencoded({extended:true}));

const ejs = require("ejs");

server.set('view engine' , 'ejs') ;

const https = require("ejs");

const _ = require("lodash");

server.use(express.static("public"));

const mongoose = require("mongoose");

const encrypt = require("mongoose-encryption");

require('dotenv').config();


mongoose.connect("mongodb+srv://m220student:m220student@mflix.fyjdx.mongodb.net/EmailPasswordAuth?retryWrites=true&w=majority" ,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const EmailAuth = new mongoose.Schema({
  username : {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});


console.log(process.env.SECRET);
EmailAuth.plugin( encrypt, { secret:process.env.SECRET, encryptedFields: ["password" , " username"]  });

const EmPas = new  mongoose.model("LOGIN PASSWORD AND EMAIL" , EmailAuth);
const hello = new EmPas({
  username:"utkarah201Singh@gmail.com",
  password:"abcf"
})


server.route("/")
.get( (req ,res )=>{

 res.render("home");

});

server.route( "/register")
.get( (  req , res  )=>{
 res.render("register");
})
.post( (req, res)=>{

const RegisterObject = new EmPas({
  username: req.body.username,
  password:req.body.password
});
RegisterObject.save((err,error)=>{
  if(err) console.log(err);
  else{
    res.render("secrets");
  }
})

});


server.route("/login")
.get( (  req , res  )=>{
 res.render("login");

})
.post((req,res)=>{

EmPas.findOne({username:req.body.username } , ( err , result)=>{

  if(err)
  {
    console.log(err);
    res.send(err);
  }

  else
  {
  if(result.password === req.body.password) res.render("secrets");
  else
  {
    res.send("Entered Wrong Email or Password Please ReEnter The password");
  }

  }

})
});


server.get("/submit" , (req ,res)=>{

  res.render("submit");
})


server.listen(3000 , (  req , res  )=>{

 console.log("Server has been Started");

})

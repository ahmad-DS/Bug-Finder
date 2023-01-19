const { Router } = require("express");
const signupModel = require("../models/signup.model");
const signup = require("../models/signup.model");
const bcrypt=require("bcrypt")

const app = Router();

app.get("/", async (req, res) => {
  try {
    let signupdata = await signup.find();
    res.send({ message: "signups", data: signupdata });
  } catch (e) {
    console.log(e);
  }
});
app.post("/", async (req, res) => {
  const {email,password}=req.body;
  try {
    let user = await signup.findOne({email})
   if(!user){
    bcrypt.hash(password, 4, async function(err, hash) {
    let newuser=new signupModel({...req.body,password:hash})
    await newuser.save()
    return res.send({
      message:"signup success"
    
    })
  });
  
   
   }else{
    return res.send({
      message:"user exits"
    })

   }
  } catch (e) {
    console.log(e);
  }
});

module.exports=app
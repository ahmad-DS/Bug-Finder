const { Router } = require("express");
require("dotenv").config();
const signup = require("../models/signup.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  const { email, password } = req.body;
  try {
    const user = await signup.findOne({ email });
    let match = bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "1 day" }
      );
      console.log(token);
      return res.send({ message: "Login success", token });
    } else {
      return res.send("invalid creds");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;

// const login=async(req,res,next)=>{
//   const {email,password} = req.body;
//   let existingUser;
//   try {
//       existingUser = await User.findOne({email})
//   } catch (error) {
//      return console.log(error)
//   }
//   if(!existingUser){
//       return res.status(404).json({msg: "Coult not found user with this Email"})
//   }
//   const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
//   if(!isPasswordCorrect){
//       return res.status(400).json({msg:"Incorrect Password"})
//   }
//   return res.status(200).json({msg:"Login Successfull", user:existingUser})

// }

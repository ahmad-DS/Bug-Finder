const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
},{
  versionKey:false
});

const signupModel = mongoose.model("signup", signupSchema);

module.exports = signupModel;
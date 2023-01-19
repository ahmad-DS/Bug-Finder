const express = require('express')
const cors = require('cors')
const app = express()
const signupRoute = require('./routes/signup.routes')
const loginRoute = require('./routes/login.route')
const connect = require('./config/db')
require('dotenv').config()

// app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors()) 
app.use("/signup",signupRoute)
app.use("/login",loginRoute)


app.get('/', (req, res) => res.send('hello'))

app.listen(process.env.PORT || 8081, async () => {
    await connect();
    console.log("mongodb connected on http://localhost:8080");
    try {
    } catch (e) {
      console.log(e);
    }
  });
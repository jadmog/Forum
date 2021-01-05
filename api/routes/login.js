const User = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
//Routes
router.post("/login", (req, res ,next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err
    if (!user) res.send("No user Exists")
    else {
      req.logIn(user, err => {
        if (err) throw err
        res.send("Successfully Authenticated")
        console.log(req.user)
      })
    }
  })(req, res, next)
})
router.post("/register", (req, res) => {
  try{
  User.findOne({username: req.body.username}, async (err, doc) => {
    if(err) throw err
    if(doc) res.send("User already exists")
    if(!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      })
      await newUser.save()
      res.send("User created")
    }
  })}
  catch{
    console.log('Request failed')
  }
})
// router.get("/user", (req, res) => {
//   res.send(req.user) //The req.user stores entire user that has been authenticated
// })

router.get('/logout', (req, res) => {
  req.logout();
  res.send("User Logged out")
});

module.exports = router
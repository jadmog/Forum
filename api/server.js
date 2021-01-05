require('dotenv').config()

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
const User = require('./models/user')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
// Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
require("./passportConfig")(passport)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const threadsRouter = require('./routes/threads')
app.use('/subject', threadsRouter)

const answersRouter = require('./routes/answers')
app.use('/answers', answersRouter)

app.listen(5000, () => console.log('Server started'))
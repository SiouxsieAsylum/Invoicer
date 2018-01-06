const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();


const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const contactRouter = require('./routes/contact-routes')
const emailRouter = require('./routes/email-routes')
const userRouter = require('./routes/user-routes')
const authRouter = require('./routes/auth-routes')

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(PORT + ', yall');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

// app.use('/api/emails', emailRouter)
app.use('/api/contacts', contactRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
});

app.use('*', (req, res) => {
  res.status(400).render("error.ejs", {auth:true, user:req.user})
});

app.use((err, req, res, next) =>{
  console.log(err);
  res.status(500).render("error.ejs", {auth:true, user:req.user})
  });


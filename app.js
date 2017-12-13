const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();


const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const emailRouter = require('./routes/email-routes')
const userRouter = require('./routes/user-routes')
const authRouter = require('./routes/auth-routes')

/*
Where am I now? Copied and pasted server.js, copied and pasted all the auth services, made the file structure. Email routes are writted and controllers are laid out for MVP. No models yet.

Decide how you want the template information to display.
Decide on a database name and do the config. Finish all user auth stuff tomorrow
*/
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
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/emails', emailRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)


app.get('/', (req, res) => {
  res.send('Hello')
});

app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Page Not Found',
  });
});

app.use((err, req, res, next) =>{
  console.log(err);
  res.status(500).json({
    error: err,
    message: err.message,
  });
});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize, User } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const bcrypt = require('bcryptjs');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: 'superSecret',
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/signup', csrfProtection, asyncHandler(async(req, res)=>{
  res.render('signup', { token: req.csrfToken() })
}))

app.get('/login', csrfProtection, asyncHandler(async(req, res) => {
  res.render('login', { token: req.csrfToken() });
}))

app.post('/signup', csrfProtection, asyncHandler(async(req, res) => {
  const { userName, firstName, lastName, email, bio, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, firstName, lastName, email, bio, hashedPassword });
  req.session.user = { id: user.id, userName: user.userName };
  res.redirect('/');
}))

app.post('/login', csrfProtection, asyncHandler(async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }});
  const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());
  
  if (isPassword) {
    req.session.user = { id: user.id, userName: user.userName }
    console.log('Logged in.', req.session.user);
    res.redirect('/');
  } else {
    console.log('Log in failure.');
  }

}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

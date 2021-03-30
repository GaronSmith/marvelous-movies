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
const reviewsRouter = require('./routes/reviews');
const moviesRouter = require('./routes/movies');
const searchRouter = require('./routes/search');
const feedRouter = require('./routes/feed')
const blockbusterShelfRouter = require('./routes/shelves');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const bcrypt = require('bcryptjs');
const { restoreUser } = require('./auth');
const { secret } = require('./config/index');

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
    name: 'marvelous-movie.sid',
    secret,
    store,
    saveUninitialized: false,
    resave: false,
  })
  );
  
  // create Session table if it doesn't already exist
  store.sync();
  
  app.use(restoreUser)
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/reviews', reviewsRouter);
  app.use('/movies', moviesRouter);
  app.use('/search', searchRouter);
  app.use('/shelves', blockbusterShelfRouter);
  app.use('/feed', feedRouter); 

  app.get('/about', (req, res)=>{
    res.render('about')
  })
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
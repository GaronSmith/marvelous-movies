const express = require('express');
const csrf = require('csurf')
const bcrypt = require('bcryptjs')
const {User} = require('../db/models')



const router = express.Router();
const csrfProtection = csrf({cookie:true});

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/sign_up', csrfProtection, asyncHandler(async (req, res) => {
  res.render('sign-up', { token: req.csrfToken() })
}));

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  res.render('login', { token: req.csrfToken() });
}));

router.post('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const { userName, firstName, lastName, email, bio, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, firstName, lastName, email, bio, hashedPassword });
  req.session.user = { id: user.id, userName: user.userName };
  res.redirect('/');
}));

router.post('/login', csrfProtection, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());

  if (isPassword) {
    req.session.user = { id: user.id, userName: user.userName }
    console.log('Logged in.', req.session.user);
    res.redirect('/');
  } else {
    console.log('Log in failure.');
  }

}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

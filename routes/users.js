const express = require('express');
const csrf = require('csurf');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator'); 

const {User} = require('../db/models')
const {loginUser, logoutUser} = require('../auth')

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const userValidators = [
  csrfProtection,
  check('userName')
    .exists({checkFalsy:true})
    .withMessage('Please provide a value for user name')
    .isLength({ max: 50 })
    .withMessage('User Name must not be more than 50 characters long'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 100 })
    .withMessage('Email Address must not be more than 100 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email'),
  check('bio')
    .isLength({max: 255})
    .withMessage('Bio must not be more than 255 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, {req}) => {
      if(value !== req.body.password) {
        throw new Error('Passwords do not match ');
      }
      return true;
    }),
];

router.get('/sign_up', csrfProtection, asyncHandler(async (req, res) => {
  res.render('sign-up', { token: req.csrfToken() })
}));

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  res.render('login', { token: req.csrfToken() });
}));

router.post('/sign_up', userValidators, asyncHandler(async (req, res, next) => {
  const { userName, firstName, lastName, email, bio, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user =  User.build({ userName, firstName, lastName, email, bio, hashedPassword });
  
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await user.save();
    loginUser(req, res, user)
    res.redirect('/')
    return req.session.save(err =>{
      if (err){
        next(err)
      } else {
        return res.redirect('/')
      }
    })
    
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('sign-up', {
      title:'Sign Up',
      user,
      errors,
      token: req.csrfToken()
    })
  }
}));

router.post('/login', csrfProtection, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());

  if (isPassword) {
    loginUser(req,res,user)
    return req.session.save(err => {
      if (err) {
        next(err)
      } else {
        return res.redirect('/')
      }
    })
  } else {
    console.log('Log in failure.');
  }

}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

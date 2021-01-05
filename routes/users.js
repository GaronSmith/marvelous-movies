var express = require('express');
var router = express.Router();
const asyncHandler = (handler) => (req,res,next) => handler(req,res,next).catch(next)
const db = require('../db/models')


/* GET users profile. */
router.get('/:id', asyncHandler(async(req, res)=> {
const currentUser = req.session.auth.userId
const users = await db.User.findByPk(currentUser,{
  include:{
    model:db.Movie
  }
})
//res.json()
res.render('profile',users)
}))

module.exports = router;

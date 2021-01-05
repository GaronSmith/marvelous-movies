const express = require('express');
const db = require('../db/models');
const router = express.Router();

/* GET users profile. */
router.get('/id', (req, res, next)=>  {
  const movies = await db.Movie.findAll() 
});

module.exports = router;

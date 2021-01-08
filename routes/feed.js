const express = require('express');

const { asyncHandler, csrfProtection } = require('./utils')
const db = require('../db/models')
const router = express.Router();
const { requireAuth } = require("../auth");

// router.use(requireAuth)

router.get('/', asyncHandler( async (req,res,next) => {
    res.render('feed-view')
}))

module.exports = router
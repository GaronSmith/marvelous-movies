const express = require('express');
const { asyncHandler, csrfProtection } = require('./utils')
const db = require('../db/models');
const router = express.Router();
const { requireAuth } = require('../auth');

router.use(requireAuth);

router.get('/want/:uid(\\d+)', asyncHandler(async(req, res) => {
    const wantToWatch = await db.BlockbusterShelf.findOne({
        include: db.Movie,
        where: {
            userId: req.session.auth.userId,
            status: 'Want to Watch',
        }
    });
    res.render('blockbuster-shelf', { 
        title: 'Blockbuster Shelves', 
        wantToWatch,
        });
}));

router.post('/want/:uid(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const {movieId,status} = req.body;
    const currentStatus = await db.BlockbusterShelf.create({
        userId: req.session.auth.userId,
        movieId,
        status,
    })
   res.json({currentStatus});
}))
 
module.exports = router;
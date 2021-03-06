const express = require('express');

const { asyncHandler, csrfProtection } = require('./utils')
const db = require('../db/models')
const router = express.Router();
const { requireAuth } = require("../auth");

router.use(requireAuth)

router.get('/', asyncHandler( async (req,res,next) => {
    res.render('feed-view')
}))


router.get('/content', asyncHandler(async (req, res, next) => {
    let user = await db.User.findByPk(req.session.auth.userId,{
        include:{
            model: db.User,
            as: 'Followers',
            include:{
                model: db.BlockbusterShelf,
                include:{
                    model: db.Movie,
                }
            }
        }
    })
 
    let arrayUpdates = new Array();
   
    arrayUpdates.sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt) )
    
    user.Followers.forEach(item => {
        item.BlockbusterShelves.forEach(statusUpdate => {
            statusUpdate.setDataValue('userName', item.firstName)
            arrayUpdates = arrayUpdates.concat(statusUpdate)
        })
    })
    arrayUpdates.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    

    res.json(arrayUpdates)
}))


router.delete('/follow/:id/delete', asyncHandler(async (req,res) => {
    
    const followRow = await db.Follow.destroy({
        where:{
            userId: req.session.auth.userId,
            followId: req.params.id
        }
    })

   res.status(200).json('deleted')
}))

router.post('/follow/new', asyncHandler( async (req,res) => {
    const newFollow = await db.Follow.create({
        userId: req.session.auth.userId,
        followId: parseInt(req.body.body)
    })
    res.json(newFollow)
}))

router.get('/follow/:uid(\\d+)', asyncHandler( async (req,res, next) => {
    const isFollowing = await db.Follow.findOne({
        where:{
            userId: req.session.auth.userId,
            followId: req.params.uid
        }
    })
   res.json(isFollowing)
}))


module.exports = router
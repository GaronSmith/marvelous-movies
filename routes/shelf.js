const express = require('express')
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const router = express.Router();
const { requireAuth } = require("../auth");

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const currentUser = req.session.auth.userId;
    const users = await db.User.findByPk(currentUser, {
      include: {
        model: db.Movie,
      },
    });
    res.render("BlockbusterShelf", { users});
  })
);

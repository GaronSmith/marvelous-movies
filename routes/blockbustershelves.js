const express = require('express');
const router = express.Router();
const { Movie } = require('../db/models');
const { Op } = require('sequelize');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const db = require('../db/models');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);


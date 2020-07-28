const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
      .get(asyncHandler(getUsers));

router.route('/:id')
      .get(asyncHandler(getUser));


async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function getUsers(req, res) {
  let users = await userCtrl.getUsers(req, res);
}

async function getUser(req, res) {
  let user = await userCtrl.getUser(req, res);
}

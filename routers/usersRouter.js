const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/usersController')
const { handle405s } = require('../errors/index')

usersRouter.route('/:username')
  .get(getUserByUsername)
  .all(handle405s)



module.exports = usersRouter

const commentsRouter = require('express').Router();
const { patchCommentVoteById, deleteCommentbyId } = require('../controllers/commentsControllers')
const { handle405s, handle404s } = require('../errors/index')

commentsRouter.route('/:comment_id')
  .patch(patchCommentVoteById)
  .delete(deleteCommentbyId)
  .all(handle405s)
  .all(handle404s)

module.exports = commentsRouter

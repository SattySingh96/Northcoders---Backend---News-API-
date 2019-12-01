const commentsRouter = require('express').Router();
const { patchCommentVoteByArticleId, deleteCommentbyArticleId } = require('../controllers/commentsControllers')
const { handle405s, handle404s } = require('../errors/index')

commentsRouter.route('/:comment_id')
    .patch(patchCommentVoteByArticleId)
    .delete(deleteCommentbyArticleId)
    .all(handle405s)
    .all(handle404s)

module.exports = commentsRouter
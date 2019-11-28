const articlesRouter = require('express').Router();
const { getArticlesById, patchArticleVoteById, postCommentById } = require('../controllers/articlesControllers')

const { handle405s, handle400s, handle404s, handle422s } = require('../errors/index')

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleVoteById)
  .all(handle405s)
  .all(handle404s)
  .all(handle400s)

articlesRouter.route('/:article_id/comments')
  .post(postCommentById)
  .all(handle405s)
  .all(handle404s)
  .all(handle400s)
  .all(handle422s)






module.exports = articlesRouter

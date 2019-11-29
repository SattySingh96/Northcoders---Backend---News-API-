const articlesRouter = require('express').Router();
const { getAllArticles, getArticlesById, patchArticleVoteById, getCommentsById, postCommentById } = require('../controllers/articlesControllers')

const { handle405s, handle404s } = require('../errors/index')

articlesRouter.route('/')
  .get(getAllArticles)
  .all(handle405s)


articlesRouter.route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleVoteById)
  .all(handle405s)
  .all(handle404s)

articlesRouter.route('/:article_id/comments')
  .get(getCommentsById)
  .post(postCommentById)
  .all(handle405s)
  .all(handle404s)









module.exports = articlesRouter

const articlesRouter = require('express').Router();
const { getArticlesById, patchArticleVoteById } = require('../controllers/articlesControllers')

const { handle405s, handle400s, handle404s } = require('../errors/index')

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleVoteById)
  .all(handle405s)
  .all(handle404s)
  .all(handle400s)





module.exports = articlesRouter

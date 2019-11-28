const articlesRouter = require('express').Router();
const { getArticlesById, patchArticleVoteById } = require('../controllers/articlesControllers')

const { handle405s, handle400s } = require('../errors/index')

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleVoteById)
  .all(handle400s)
  .all(handle405s)



module.exports = articlesRouter

const articlesRouter = require('express').Router();
const { getAllArticles, getArticleByArticleId, patchArticleVoteByArticleId, getCommentsByArticleId, postCommentByArticleId } = require('../controllers/articlesControllers')

const { handle405s, handle404s } = require('../errors/index')

articlesRouter.route('/')
    .get(getAllArticles)
    .all(handle405s)


articlesRouter.route('/:article_id')
    .get(getArticleByArticleId)
    .patch(patchArticleVoteByArticleId)
    .all(handle405s)
   

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(postCommentByArticleId)
    .all(handle405s)
   









module.exports = articlesRouter
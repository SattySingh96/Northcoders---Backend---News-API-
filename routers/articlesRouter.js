const articlesRouter = require('express').Router();
const { getArticlesByID } = require('../controllers/articlesControllers');
const { handle405s } = require('../errors/index')


articlesRouter.route('/:article_id').get(getArticlesByID).all(handle405s)



module.exports = articlesRouter

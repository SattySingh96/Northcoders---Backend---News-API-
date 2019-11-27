const { fetchArticlesById } = require('../models/articlesModel')


exports.getArticlesById = (req, res, next) => {
  console.log('sending articles')
  fetchArticlesById(req.params)
    .then((articles) => {
      res.sendStatus(200)
    })
    .catch(next);
}
const { fetchArticlesById } = require('../models/articlesModel')


// exports.getArticlesById = (req, res, next) => {
//   console.log('sending articles')
//   fetchArticlesById(req.params.article_id)
//     .then((articles) => {
//       res.status(200).send({ articles })
//     })
//     .catch(next);
// }

// exports.getArticlesById = (req, res, next) => {
//   console.log('sending articles')
//   fetchArticlesById(req.params)
//     .then((articles) => {
//       res.sendStatus(200)
//     })
//     .catch(next);
// }
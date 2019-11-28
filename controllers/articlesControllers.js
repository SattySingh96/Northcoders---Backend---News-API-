const { fetchArticlesById, updateArticleVotesById } = require('../models/articlesModel')


exports.getArticlesById = (req, res, next) => {
  console.log('sending articles')
  fetchArticlesById(req.params.article_id)
    .then((articles) => {
      res.status(200).send({ articles: articles[0] })
    })
    .catch(next);
}

exports.patchArticleVoteById = (req, res, next) => {
  console.log("patching votes")
  console.log(req.body['inc-votes'])
  updateArticleVotesById(req.params.article_id, req.body['inc-votes'])
    .then((patchedBody) => {
      res.status(200).send({ patchedBody: patchedBody[0] })
    })
    .catch(next)
}
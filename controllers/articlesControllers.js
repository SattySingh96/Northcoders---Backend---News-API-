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
  if (typeof req.body['inc-votes'] === 'string') {
    return Promise.reject({ status: 400, msg: 'Bad Request' })
      .catch(next)
  }
  else if (typeof req.body['inc-votes'] === 'string') {
    return Promise.reject({ status: 400, msg: 'Bad Request' })
      .catch(next)
  }

  else {
    console.log("patching votes")
    updateArticleVotesById(req.params.article_id, req.body['inc-votes'])
      .then((patchedBody) => {
        res.status(200).send({ patchedBody: patchedBody[0] })
      })
      .catch(next)
  }
}
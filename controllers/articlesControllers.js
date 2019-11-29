const { fetchAllArticles, fetchArticlesById, updateArticleVotesById, addCommentById, fetchCommentsById } = require('../models/articlesModel')

//--------------------/articles-----------------------------
exports.getAllArticles = (req, res, next) => {

  console.log('getting all articles')
  fetchAllArticles(req.query)
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject(
          {
            status: 404,
            msg: 'No articles found'
          })
      }
      res.status(200).send({ articles: articles })
    })
    .catch(next);
}

// -----------------/articles/:article_id--------------------

exports.getArticlesById = (req, res, next) => {
  console.log('getting articles')
  fetchArticlesById(req.params.article_id)
    .then((articles) => {
      res.status(200).send({ articles: articles[0] })
    })
    .catch(next);
}

exports.patchArticleVoteById = (req, res, next) => {
  console.log("patching votes")
  updateArticleVotesById(req.params.article_id, req.body['inc_votes'])
    .then((patchedBody) => {
      console.log(patchedBody)
      res.status(200).send({ patchedBody: patchedBody[0] })
    })
    .catch(next)
}

//-----------------/articles/:article_id/comments---------------

exports.postCommentById = (req, res, next) => {
  console.log('posting comment')
  addCommentById(req.params.article_id, req.body)
    .then((postedBody) => {
      res.status(201).send(postedBody[0])
    })
    .catch(next);
}

exports.getCommentsById = (req, res, next) => {
  console.log('getting comments')
  fetchCommentsById(req.params.article_id, req.query)
    .then((comments) => {
      res.status(200).send({ comments })
    })
    .catch(next)
}
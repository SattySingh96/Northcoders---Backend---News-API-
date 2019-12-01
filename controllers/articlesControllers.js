const { fetchAllArticles, fetchArticleByArticleId, updateArticleVotesByArticleId, addCommentByArticleId, fetchCommentsByArticleId, checkArticleExists, checkAuthorExists } = require('../models/articlesModel')

//--------------------/articles-----------------------------
exports.getAllArticles = (req, res, next) => {
    Promise.all([fetchAllArticles(req.query), checkAuthorExists(req.query)])
    .then(([articles])=>{
        //console.log(articles)
        res.status(200).send(articles);
    })
    .catch(next);
}


// -----------------/articles/:article_id--------------------

exports.getArticleByArticleId = (req, res, next) => {
    fetchArticleByArticleId(req.params.article_id)
        .then((article) => {
            res.status(200).send({ article: article[0] })
        })
        .catch(next);
}

exports.patchArticleVoteByArticleId = (req, res, next) => {
    updateArticleVotesByArticleId(req.params.article_id, req.body.inc_votes)
        .then((votes) => {
            res.status(200).send({ votes: votes[0] })
        })
        .catch(next)
}

//-----------------/articles/:article_id/comments---------------

exports.postCommentByArticleId = (req, res, next) => {
    addCommentByArticleId(req.params.article_id, req.body)
        .then((comments) => {
            res.status(201).send(comments[0])
        })
        .catch(next);
}

exports.getCommentsByArticleId = (req, res, next) => {
    const id = req.params.article_id;
    Promise.all([fetchCommentsByArticleId(id, req.query), checkArticleExists(id)])
        .then(([comments]) => {
            res.status(200).send({ comments })
        })
        .catch(next);
}
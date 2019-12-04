const { fetchAllArticles, fetchArticleByArticleId, updateArticleVotesByArticleId, addCommentByArticleId, fetchCommentsByArticleId, checkArticleExists, checkAuthorExists, checkTopicExists } = require('../models/articlesModel')

//--------------------/articles-----------------------------

exports.getAllArticles = (req, res, next) => {
    if (!req.query.hasOwnProperty('author') && !req.query.hasOwnProperty('topic')) {
        fetchAllArticles(req.query)
            .then((articles) => {
                res.status(200).send({ articles: articles });
            })
            .catch(next)
    }
    else if (req.query.hasOwnProperty('author') && !req.query.hasOwnProperty('topic')) {
        Promise.all([fetchAllArticles(req.query), checkAuthorExists(req.query)])
            .then((articles) => {
                res.status(200).send({ articles: articles[0] });
            })
            .catch(next);
    }
    else if (req.query.hasOwnProperty('topic') && !req.query.hasOwnProperty('author')) {

        Promise.all([fetchAllArticles(req.query), checkTopicExists(req.query)])
            .then((articles) => {
                res.status(200).send({ articles: articles[0] });
            })
            .catch(next);
    }
    else if (req.query.hasOwnProperty('author') && req.query.hasOwnProperty('topic')) {

        Promise.all([fetchAllArticles(req.query), checkAuthorExists(req.query), checkTopicExists(req.query)])
            .then((articles) => {
                res.status(200).send({ articles: articles });
            })
            .catch(next);
    }

}


exports.getCommentsByArticleId = (req, res, next) => {
    const id = req.params.article_id;
    Promise.all([fetchCommentsByArticleId(id, req.query), checkArticleExists(id)])
        .then(([comments]) => {
            res.status(200).send({ comments })
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
        .then((updatedVotes) => {
            res.status(200).send({ article: updatedVotes[0] })
        })
        .catch(next)
}

//-----------------/articles/:article_id/comments---------------

exports.postCommentByArticleId = (req, res, next) => {
    addCommentByArticleId(req.params.article_id, req.body)
        .then((comments) => {
            res.status(201).send({ comment: comments[0] })
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
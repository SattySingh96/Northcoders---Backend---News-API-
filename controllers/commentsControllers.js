const { updateCommentVotesByArticleId, removeCommentByArticleId } = require('../models/commentsModel')



//-----------/comments/:comment_id-----------------

exports.patchCommentVoteByArticleId = (req, res, next) => {
    updateCommentVotesByArticleId(req.params.comment_id, req.body.inc_votes)
        .then((votes) => {
            res.status(200).send({ votes: votes[0] })
        })
        .catch(next)
}

exports.deleteCommentbyArticleId = (req, res, next) => {
    removeCommentByArticleId(req.params.comment_id).then(() => {
        res.status(204).send()
    });
};
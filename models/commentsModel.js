const connection = require('../db/connection')


//------------/comments/:comment_id--------------------

exports.updateCommentVotesByArticleId = (id, patchBody) => {
    if (typeof patchBody === 'string') {
        return Promise.reject({ status: 400, msg: 'Bad Request' })
    }
    return connection('comments')
        .where('comment_id', id)
        .increment('votes', patchBody)
        .returning('*')
        .then((commentArray) => {
            if (commentArray.length === 0) {
                return Promise.reject({ status: 404, msg: 'Comment not found' })
            } else {
                return commentArray;
            }
        })
}

exports.removeCommentByArticleId = (id) => {
    return connection('comments')
        .where('comment_id', id)
        .del('*')
}
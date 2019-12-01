const connection = require('../db/connection')


//------------/comments/:comment_id--------------------

exports.updateCommentVotesByArticleId = (id, vote_inc = 0) => {
    return connection('comments')
        .where('comment_id', id)
        .increment('votes', vote_inc)
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
        .then((delCount) => {           
            if (delCount.length === 0) {
                return Promise.reject({status:404, msg:'Comment not found'})
            } 
        });
}
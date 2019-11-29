const connection = require('../db/connection')


//------------/comments/:comment_id--------------------

exports.updateCommentVotesById = (id, patchBody) => {
  if (typeof patchBody === 'string') {
    return Promise.reject({ status: 400, msg: 'Bad Request' })
  }
  console.log('updating votes in db')
  return connection('comments')
    .where('comment_id', id)
    .increment('votes', patchBody)
    .returning('*')
    .then((commentArray) => {
      if (commentArray.length === 0) {
        return Promise.reject({ status: 404, msg: 'Comment not found' })
      }
      else {
        return commentArray;
      }
    })
}

exports.removeCommentById = (id) => {
  console.log('removing comments')
  return connection('comments')
    .where('comment_id', id)
    .del('*')
}
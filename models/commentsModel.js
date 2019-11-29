const connection = require('../db/connection')


//------------/comments/:comment_id--------------------

exports.updateCommentVotesById = (id, patchBody) => {
  console.log('updating votes in db')
  return connection('comments')
    .where('comment_id', id)
    .increment('votes', patchBody)
    .returning('*')
}

exports.removeCommentById = (id) => {
  console.log('removing comments')
  return connection('comments')
    .where('comment_id', id)
    .del('*')
}
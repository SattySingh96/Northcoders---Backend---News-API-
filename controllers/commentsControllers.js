const { updateCommentVotesById } = require('../models/commentsModel')



//-----------/comments/:comment_id-----------------

exports.patchCommentVoteById = (req, res, next) => {
  if (typeof req.body['inc_votes'] === 'string') {
    return Promise.reject({ status: 400, msg: 'Bad Request' })
      .catch(next)
  }
  else {
    console.log('sending patch')
    updateCommentVotesById(req.params.comment_id, req.body['inc_votes'])
      .then((patchedBody) => {
        res.status(200).send({ patchedBody: patchedBody[0] })
      })
      .catch(next)
  }
}
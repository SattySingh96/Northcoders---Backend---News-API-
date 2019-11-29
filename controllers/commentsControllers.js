const { updateCommentVotesById, removeCommentById } = require('../models/commentsModel')



//-----------/comments/:comment_id-----------------

exports.patchCommentVoteById = (req, res, next) => {
  console.log('sending patch')
  updateCommentVotesById(req.params.comment_id, req.body['inc_votes'])
    .then((patchedBody) => {
      console.log(patchedBody)
      res.status(200).send({ patchedBody: patchedBody[0] })
    })
    .catch(next)
}

exports.deleteCommentbyId = (req, res, next) => {
  console.log('sending delete')
  removeCommentById(req.params.comment_id).then(() => {
    res.status(204).send()
  });
};
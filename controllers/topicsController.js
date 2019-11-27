const { fetchAllTopics } = require('../models/topicsModel')


exports.getAllTopics = (req, res, next) => {
  console.log('sending topics')
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics })
    })
    .catch(next);
}
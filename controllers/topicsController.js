const { fetchAllTopics } = require('../models/topicsModels')


exports.getAllTopics = (req, res, next) => {
  console.log('sending topics')
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics })
    });
}
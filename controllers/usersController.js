const { fetchUserByUsername } = require('../models/usersModel')


exports.getUserByUsername = (req, res, next) => {
  console.log('sending user')
  console.log(req.params.username)
  fetchUserByUsername(req.params.username)
    .then((user) => {
      res.status(200).send({ user: user[0] })
    })
    .catch(next);
}
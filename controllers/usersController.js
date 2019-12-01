const { fetchUserByUsername } = require('../models/usersModel')


exports.getUserByUsername = (req, res, next) => {
    fetchUserByUsername(req.params.username)
        .then((user) => {
            res.status(200).send({ user: user[0] })
        })
        .catch(next);
}
const connection = require('../db/connection');

exports.fetchUserByUsername = (user) => {
    return connection
        .select("*")
        .from('users')
        .where('username', user)
        .then((user) => {
            if (user.length === 0) {
                return Promise.reject({status:404, msg: 'user not found'})
            }
            return user;
        });
};
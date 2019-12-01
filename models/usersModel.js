const connection = require('../db/connection');

exports.fetchUserByUsername = (user) => {
    return connection
        .select("*")
        .from('users')
        .where('username', user)

};
const connection = require('../db/connection');

exports.fetchUserByUsername = (user) => {
  console.log('fetching user from db')
  return connection
    .select("*")
    .from('users')
    .where('username', user)

};
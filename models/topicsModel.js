const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  console.log('fetching topics from db')
  return connection
    .select("*")
    .from('topics')
    .returning('*')
};
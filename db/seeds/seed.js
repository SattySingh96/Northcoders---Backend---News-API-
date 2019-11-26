const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');





exports.seed = function (knex) {
  const topicsInsertions = knex('topics').insert(topicData);
  const usersInsertions = knex('users').insert(userData);

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      const formattedData = formatDates(articleData);
      console.log(formattedData)
      return knex
        .insert(formattedData)
        .into('articles')
        .returning('*');
    })
    .then((articleRows) => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex('comments').insert(formattedComments);
    });
};

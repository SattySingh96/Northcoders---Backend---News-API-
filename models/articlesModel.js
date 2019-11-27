const connection = require('../db/connection');

exports.fetchArticlesById = (id) => {
  console.log('fetching articles from db')
  return connection
    .select("*")
    .from('articles')
    .where('article_id', id)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
};
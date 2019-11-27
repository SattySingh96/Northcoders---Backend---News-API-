const connection = require('../db/connection');

exports.fetchArticlesById = (id) => {
  console.log('fetching articles from db')
  return connection
    .select("articles.*")
    .count('comment_id as comment_count')
    .from('articles')
    .where('articles.article_id', id)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
};
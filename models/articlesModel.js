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

exports.updateArticleVotesById = (id, patchBody) => {
  console.log('updating votes in db')
  return connection('articles')
    .where('article_id', id)
    .increment('votes', patchBody)
    .returning('*');
}
exports.addCommentById = (id, postInfo) => {
  const postBody = {
    author: postInfo.username,
    article_id: id,
    body: postInfo.body
  }
  console.log('adding comment to db')
  return connection('comments')
    .insert(postBody)
    .returning('*')
}
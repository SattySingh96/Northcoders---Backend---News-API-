const connection = require('../db/connection');

//----------------/articles----------------------------

exports.fetchAllArticles = ({ sort_by, order, author, topic }) => {
  console.log('fetching all articles')
  console.log(author)
  return connection
    .select('articles.*')
    .count('comment_id as comment_count')
    .from('articles')
    .modify(query => {
      if (author) query.where('articles.author', author)
      if (topic) query.where('articles.topic', topic)
    })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by || "created_at", order || 'desc')
}

//-----------------/articles/:article_id--------------------


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


//-----------------/articles/:article_id/comments---------------


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

exports.fetchCommentsById = (id, { sort_by, order }) => {
  console.log('fetching comments from db')
  return connection
    .select('comment_id', 'author', 'votes', 'created_at', 'body')
    .from('comments')
    .where('article_id', id)
    .orderBy(sort_by || "created_at", order || 'desc')
} 
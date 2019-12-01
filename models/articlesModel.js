const connection = require('../db/connection');

//----------------/articles----------------------------

exports.fetchAllArticles = ({ sort_by, order, author, topic }) => {
    return connection('articles')    
        .select('articles.*')
        .count('comment_id as comment_count')
        .modify(query => {
            if (author) query.where('articles.author', author)
            if (topic) query.where('articles.topic', topic)
        })
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .orderBy(sort_by || "created_at", order || 'desc')
}

exports.checkAuthorExists = ({author}) => {
    return connection('users')
    .select('*')
    .where('username', author)
    .then(([author]) => {
        if (!author) return Promise.reject({ status : 404, msg : 'No author found' });
    });
}

exports.checkTopicExists = ({topic}) => {
    return connection('topics')
    .select('*')
    .where('slug', topic)
    .then(([topic]) => {
        if (!topic) return Promise.reject({ status : 404, msg : 'No articles found' });
    });
}

//-----------------/articles/:article_id--------------------


exports.fetchArticleByArticleId = (id) => {
    return connection
        .select("articles.*")
        .count('comment_id as comment_count')
        .from('articles')
        .where('articles.article_id', id)
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .then((articles) => {
            if (articles.length === 0) {
                return Promise.reject({ status: 404, msg: 'article not found' })
            }
            return articles;
        })        
};

exports.updateArticleVotesByArticleId = (id, vote_inc = 0) => {    
    return connection('articles')
        .where('article_id', id)
        .increment('votes', vote_inc)
        .returning('*')
        .then((articleArray) => {
            if (articleArray.length === 0) {
                return Promise.reject({ status: 404, msg: 'article not found' })
            } else {
                return articleArray;
            }            
        })
}


//-----------------/articles/:article_id/comments---------------


exports.addCommentByArticleId = (id, body) => {
    const newComment = {
        author: body.username,
        article_id: id,
        body: body.body
    }
    return connection('comments')
        .insert(newComment)
        .returning('*')
}

exports.fetchCommentsByArticleId = (id, { sort_by, order }) => {
    return connection('comments')
        .select('comment_id', 'author', 'votes', 'created_at', 'body')
        .where('article_id', id)
        .orderBy(sort_by || "created_at", order || 'desc')
}

exports.checkArticleExists = id => {
    return connection('articles')
    .select('*')
    .where('article_id', id)
    .then(([articles]) => {
        if (!articles) return Promise.reject({ status : 404, msg : 'article not found' });
    });
}

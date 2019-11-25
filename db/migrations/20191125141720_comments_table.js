
exports.up = function (knex) {
  console.log('Creating comments table')
  return knex.schema.createTable('comments',
    (commentsTable) => {
      commentsTable.increments('comment_id').primary();
      commentsTable.string().references('users.username');
      commentsTable.increments().references('articles.article_id');
      commentsTable.integer('votes').defaultTo(0);
      commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
      commentsTable.text('body').notNullable();
    })

};

exports.down = function (knex) {
  console.log('removing comments table')
  return knex.schema.dropTable('comments');

};

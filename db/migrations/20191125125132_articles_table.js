
exports.up = function (knex) {
  console.log('Creating articles table');
  return knex.schema.createTable('articles',
    (articlesTable) => {
      articlesTable.increments('article_id').primary();
      articlesTable.string('title').notNullable();
      articlesTable.text('body').notNullable();
      articlesTable.integer('votes').notNullable();
      articlesTable.





    });

};

exports.down = function (knex) {

};

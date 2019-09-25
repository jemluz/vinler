
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id').primary()
    table.string('nome').notNull()
    table.string('login').notNull().unique()
    table.string('senha').notNull()
    table.string('fotoUrl', 1000)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('usuarios')
};

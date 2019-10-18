
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categorias', table => {
    table.increments('id').primary()
    table.string('nome').notNull()
    // table.string('vinculados').notNull()
    table.string('fotoUrl', 1000)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categorias')  
};

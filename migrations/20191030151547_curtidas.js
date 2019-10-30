
exports.up = function(knex, Promise) {
  return knex.schema.createTable('curtidas', table => {
    table.increments('id').primary()
    table.integer('livroCurtidoId').unsigned().references('id').inTable('livros').notNull()
    table.integer('usuarioInteressadoId').unsigned().references('id').inTable('usuarios').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('curtidas')
};

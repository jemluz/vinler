
exports.up = function(knex, Promise) {
  return knex.schema.createTable('curtidas', table => {
    table.increments('id').primary()
    table.integer('usuarioInteressadoId').unsigned().references('id').inTable('usuarios').onDelete('CASCADE').notNull()
    table.integer('livroCurtidoId').unsigned().references('id').inTable('livros').onDelete('CASCADE').notNull()
    table.integer('proprietarioId').unsigned().references('id').inTable('usuarios').onDelete('CASCADE').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('curtidas')
};

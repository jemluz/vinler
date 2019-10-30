
exports.up = function(knex, Promise) {
  return knex.schema.createTable('donos_livros', table => {
    table.increments('id').primary()
    table.integer('livroId').unsigned().references('id').inTable('livros').notNull()
    table.integer('usuarioId').unsigned().references('id').inTable('usuarios').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('donos_livros')
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('livros', table => {
    table.increments('id').primary()
    table.string('titulo').notNull()
    table.string('descricao', 1000).notNull()
    table.string('fotoUrl', 1000)
    table.integer('proprietarioId').unsigned().references('id').inTable('usuarios').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('livros')
};

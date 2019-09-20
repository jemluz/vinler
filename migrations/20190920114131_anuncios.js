exports.up = function(knex, Promise) {
  return knex.schema.createTable('anuncios', table => {
    table.increments('id').primary().notnull()
    table.string('tituloLivro').notNull()
    table.string('descricao').notNull()
    table.string('estado').notNull()
    table.integer('anuncianteId').unsigned().notNullable().references('id').inTable('usuarios')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('anuncios')
};

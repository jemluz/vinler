
exports.up = function(knex, Promise) {
  return knex.schema.createTable('matches', table => {
    table.increments('id').primary()
    table.integer('usuario1').unsigned().references('id').inTable('usuarios').onDelete('CASCADE').notNull()
    table.integer('usuario2').unsigned().references('id').inTable('usuarios').onDelete('CASCADE').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('matches')
};

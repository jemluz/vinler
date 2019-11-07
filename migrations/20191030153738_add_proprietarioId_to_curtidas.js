
exports.up = function(knex, Promise) {
  return knex.schema.table('curtidas', table => {
    table.integer('proprietarioId').unsigned().references('id').inTable('usuarios').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('curtidas', table => {
    table.dropColumn('proprietarioId');
  });
};

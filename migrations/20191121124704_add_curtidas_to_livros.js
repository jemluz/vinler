
exports.up = function(knex, Promise) {
  return knex.schema.table('livros', table => {
    table.integer('nCurtidas');
  });
};

exports.down = function(knex, Promise) {
  
};

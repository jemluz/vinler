// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'vinler',
    user: 'root',
    password: 'admin'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

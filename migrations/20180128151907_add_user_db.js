
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',(table)=>{
    table.uuid('id').notNullable().primary();
    table.string('email').notNullable();
    table.string('password');
    table.enu('type', ['local', 'facebook']);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

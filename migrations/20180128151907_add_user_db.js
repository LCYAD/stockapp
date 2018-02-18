
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',(table)=>{
    table.uuid('id').notNullable().primary();
    table.string('email').notNullable();
    table.string('password');
    table.enu('type', ['local', 'facebook']);
    table.json('panel_setting');
    table.json('user_setting');
    table.json('watchlist');
    table.string('igtoken');
    table.string('oandatoken');
    table.string('following');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

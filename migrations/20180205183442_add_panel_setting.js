
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table)=>{
        table.json('panel_setting');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table)=>{
        table.dropColumn('panel_setting');
    });
};

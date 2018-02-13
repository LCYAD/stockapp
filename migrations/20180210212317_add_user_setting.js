
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table)=>{
        table.json('user_setting');
        table.json('watchlist');
        table.string('igtoken');
        table.string('oandatoken');
        table.string('following');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table)=>{
        table.dropColumn('user_setting');
        table.dropColumn('watchlist');
        table.dropColumn('igtoken');
        table.dropColumn('oandatoken');
        table.dropColumn('following');
    });
};

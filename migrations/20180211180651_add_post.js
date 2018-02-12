
exports.up = function(knex, Promise) {
    return knex.schema.createTable("post", function (table) {
        table.increments(); // integer id
        table.string('name');
        table.string('email');
        table.string('date');
        table.string('msg');
        table.string('img');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('post');
};

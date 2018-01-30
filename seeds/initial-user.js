const uuid = require('uuid4');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: uuid(), email: 'abc@gmail.com', password: '123456', type: 'local'},
        {id: uuid(), email: 'something@gmail.com', password: '123456', type: 'local'},
      ]);
    });
};

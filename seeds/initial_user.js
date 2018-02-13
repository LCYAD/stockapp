const uuid = require('uuid4');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: uuid(), email: 'abc@gmail.com', password: '123456', type: 'local', 
          panel_setting: JSON.stringify({1: 'none', 2: 'none', 3: 'none'}),
          user_setting: JSON.stringify({currency: 'HKD', balance: '200000', leverage: '5', beta_low: '-2', beta_high: '2'}),
          watchlist: JSON.stringify({name: 'myFirstList', instru: []}),
          igtoken: '',
          oandatoken: '',
        },
        { id: uuid(), email: 'something@gmail.com', password: '123456', type: 'local', 
          panel_setting: JSON.stringify({1: 'none', 2: 'none', 3: 'none'}),
          user_setting: JSON.stringify({currency: 'USD', balance: '50000', leverage: '3', beta_low: '-1', beta_high: '1.5'}),
          watchlist: JSON.stringify({name: 'stupidlist', instru: []}),
          igtoken: '',
          oandatoken: '',
        },
      ]);
    });
};
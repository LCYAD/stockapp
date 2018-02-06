var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var axios = require('axios');

require('dotenv').config();
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host:     process.env.DB_HOST,
        database: process.env.DB_NAME,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
});

class MainRoutes {
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post('/', this.local.bind(this));
        return router;
    }

    local(req,res){
        //console.log(req);
        this.userService.getUser('local', req.body.email)
        .then(()=>{
            console.log(req);
            console.log("get post~~");
            // }).then(function () {
            //         return knex("payment_paypal_status").insert([
            //             {name: "A", description: "A"},
            //         ]);
            //     }
            // )

            knex.select("*").from("post").where({"email" : req.body.email})
                .then(function (values) {
                res.json(values)
                // No need to check err object as this function will 
                // only be executed only when it is a success.
                console.log(values);
              }).catch(function(err) {
                // All the error can be checked in this piece of code
                console.log(err);
              }).finally(function() {
                // To close the connection pool
                //knex.destroy();
              });

            // knex.insert(req.body).into("post").then(function (id) {
            //     console.log(id);
            //     res.json({res:'Post are received.'});
            // })
            // .finally(function() {
            //     knex.destroy();
            // });

            //res.json({res:'Post is Sent.'});
    })
    }
 }

module.exports = MainRoutes;
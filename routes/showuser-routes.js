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

class ShowUserRoutes {
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
            console.log(req.body);
            knex.select("*").from("users")
                .then(function (values) {
                    console.log(values)
                    var emailArray = [];
                    for (var i=0; i< values.length; i++) {
                        emailArray.push(values[i].email)
                    }
                res.json(emailArray);
                // No need to check err object as this function will 
                // only be executed only when it is a success.

              }).catch(function(err) {
                // All the error can be checked in this piece of code
                console.log(err);
              }).finally(function() {

              });
    })
    }
 }

module.exports = ShowUserRoutes;
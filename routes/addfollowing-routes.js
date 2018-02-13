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

class AddFollowingRoutes {
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post('/', this.local.bind(this));
        return router;
    }

    local(req,res){
        console.log(req.body);
        //this.userService.getUser('local', req.body.email)
            //console.log(req);
            knex.select("*").from("users").where({'email': req.body.user})
                .then(function (values) {

                    console.log(values);
                    console.log(values[0].following);

                    var followingUpdate;
                    if (values[0].following == null) {
                        followingUpdate = JSON.stringify(req.body.following);
                    } else {
                        var n = followingUpdate.includes(JSON.stringify(req.body.following));
                        if (n == false) {
                            followingUpdate = values[0].following + ',' + JSON.stringify(req.body.following);
                        }
                    }

                    knex('users')                               //users table
                    .where('email', req.body.user)
                    .update({
                        following: followingUpdate,
                    })
                    .then(function (user) {
                     //Do something 
                             res.json({ following: followingUpdate});
                    });

                // No need to check err object as this function will 
                // only be executed only when it is a success.
              }).catch(function(err) {
                // All the error can be checked in this piece of code
                console.log(err);
              }).finally(function() {
                // To close the connection pool
                //knex.destroy();
              });

    }
 }

module.exports = AddFollowingRoutes;
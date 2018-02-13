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

class GetCommentRoutes {
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
            //console.log(req);
            console.log("get comment~~");

            knex.select("*").from("post").where({"date" : req.body.postId})
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

    })
    }
 }

module.exports = GetCommentRoutes;
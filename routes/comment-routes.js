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

class CommentRoutes {
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post('/', this.local.bind(this));
        return router;
    }

    local(req,res){

        this.userService.getUser('local', req.body.comment.email)
        .then(()=>{
            //console.log(req.body.email);
            console.log(req.body.postId);
            console.log(typeof req.body.comment);
            // knex.insert(req.body).into("post").then(function (id) {
            //     console.log(id);
            //     res.json({res:'Post is Sent.'});
            // })
            // .finally(function() {
            // //    knex.destroy();
            // });
            knex.select("*").from("post").where({"date": req.body.postId})
                .then(function (values) {
                    //console.log(values[0].comment)
                    var commentUpdate;
                    if (values[0].comment == '') {
                        commentUpdate = JSON.stringify(req.body.comment);
                    } else {
                        commentUpdate = values[0].comment + ',' + JSON.stringify(req.body.comment);
                    }

                    knex('post')                               //users table
                    .where('date', req.body.postId)
                    .update({
                        comment: commentUpdate,
                    })
                    .then(function (user) {
                        //Do something 
                       res.json({res:'Post is Sent.'});
                    });
    
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

            // knex('post')                               //users table
            //     .where('date', req.body.postId)
            //     .update({
            //         comment: 
            //     })
            //     .then(function (user) {
            //         //Do something 
            //         console.log(id);
            //        res.json({res:'Post is Sent.'});
            //     });

            //res.json({res:'Post is Sent.'});
    })
    }
 }

module.exports = CommentRoutes;
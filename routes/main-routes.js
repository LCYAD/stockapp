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
        console.log(req);
        console.log("OKOK");
        this.userService.getUser('local', req.body.email)
        .then(()=>{
            console.log(req.body.email);

            knex.insert(req.body).into("post").then(function (id) {
                console.log(id);
                res.json({res:'Post is Sent.'});
            })
            .finally(function() {
                knex.destroy();
            });

            //res.json({res:'Post is Sent.'});
    })
    }
 }

module.exports = MainRoutes;
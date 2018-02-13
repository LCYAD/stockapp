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

class DeletePostRoutes {
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.delete('/', this.local.bind(this));
        return router;
    }

    local(req,res){

        this.userService.getUser('local', req.body.email)
        .then(()=>{
            //console.log(req.body.email);
        //    console.log(req.query[0]);
            //res.json({res:'Post is deleted.'});

            knex("post").where("date", req.query[0]).del().then(function (count) {
        //        console.log(count);
                res.json({res:'Post is deleted.'});
              }).finally(function () {
                //knex.destroy();
              });

        })
    }
 }

module.exports = DeletePostRoutes;
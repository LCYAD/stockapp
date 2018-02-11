var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var authClass = require('./../auth');

var auth = authClass();

class BrokerRoutes {
    constructor(brokerService){
        this.brokerService = brokerService;
    }

    router(){
        let router = express.Router();
        router.post('/oanda', auth.authenticate(), this.changeOandaToken.bind(this));
        router.post('/ig', auth.authenticate(), this.changeIGToken.bind(this));
        return router;
    }

    changeOandaToken(req,res){
        // console.log(req.user);
        return this.brokerService.changeToken('oandatoken', req.body.oandatoken, req.user.id)
        .then((token)=>{
            if (token.length) {
                res.json({
                    oandatoken: token
                });
            } else {
                res.sendStatus(401);
            }
        }).catch((err)=>{
            res.sendStatus(401);
        });
    }

    changeIGToken(req,res){
        // console.log(req.user);
        return this.brokerService.changeToken('igtoken', req.body.igtoken, req.user.id)
        .then((token)=>{
            if (token.length) {
                res.json({
                    igtoken: token
                });
            } else {
                res.sendStatus(401);
            }
        }).catch((err)=>{
            res.sendStatus(401);
        });
    }

}

module.exports = BrokerRoutes;
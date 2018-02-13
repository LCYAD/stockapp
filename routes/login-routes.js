var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var axios = require('axios');

class LoginRoutes {
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post('/', this.local.bind(this));
        router.post('/facebook', this.facebook.bind(this));
        router.post('/signup', this.signup.bind(this));
        return router;
    }

    local(req,res){
        return this.userService.getUser('local', req.body.email)
        .then((user)=>{
            if (user.length) {
                //check password
                if (user[0].password === req.body.password){
                    console.log(user[0].id);
                    var payload = {
                        id: user[0].id
                    };
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                        token: token,
                        email: req.body.email,
                        username: req.body.name
                    });
                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }
        }).catch((err)=>{
            res.sendStatus(401);
        });
    }

    facebook(req,res){ 
        if (req.body.access_token) {
        var accessToken = req.body.access_token;
        
        return axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name`)
            .then((data)=>{
                //console.log(data.data);
                if(!data.data.error){
                    this.userService.getUser('facebook', data.data.email).then((user)=>{
                        // console.log(user);
                        if (user.length){
                            var payload = {
                                id: user[0].id
                            };
                            var token = jwt.encode(payload, config.jwtSecret);
                            res.json({
                                token: token,
                                email: data.data.email,
                                username: data.data.name
                            });
                        } else {
                            //create a new user
                            this.userService.createUser('facebook', data.data.email).then(id=>{
                                console.log(id)
                                var payload = {
                                    id: id[0]
                                };
                                var token = jwt.encode(payload, config.jwtSecret);
                                res.json({
                                    token: token,
                                    email: data.data.email,
                                    username: data.data.name
                                });
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        res.sendStatus(401);
                    });
                }else{
                    res.sendStatus(401);
                }
            }).catch((err)=>{
                console.log(err);
                res.sendStatus(401);
            });
        } else {
            res.sendStatus(401);
        }
    }

    signup(req,res){
        return this.userService.createUser('local', req.body.email, req.body.password).then(id=>{
            var payload = {
                id: id[0]
            };
            console.log(payload);
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token,
                email: req.body.email,
                username: req.body.email
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
}

module.exports = LoginRoutes;
var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var axios = require('axios');
var authClass = require('./../auth');

var auth = authClass();

class UserRoutes {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();
        router.get('/', auth.authenticate(), this.retreive.bind(this));
        router.post('/panel/', auth.authenticate(), this.panelSetting.bind(this));
        router.post('/setting/', auth.authenticate(), this.userSetting.bind(this))
        return router;
    }

    retreive(req, res) {
        // console.log(req.user);
        return this.userService.getUser('', '', req.user.id)
            .then((user) => {
                if (user.length) {
                    res.json(user);
                } else {
                    res.sendStatus(401);
                }
            }).catch((err) => {
                res.sendStatus(401);
            });
    }

    panelSetting(req, res) {
        console.log(req.body);
        return this.userService.getPanelSetting(req.user.id)
            .then((panel_setting) => {
                // console.log('old panel_setting', panel_setting[0].panel_setting);
                let new_panel_setting = panel_setting[0].panel_setting;

                new_panel_setting[req.body.panelnum] = req.body.paneltype;
                // console.log('new panel', new_panel_setting);
                this.userService.updatePanelSetting(req.user.id, new_panel_setting).then((updated_panel_setting) => {
                    res.json(updated_panel_setting);
                }).catch((err) => {
                    res.sendStatus(401);
                });
            }).catch((err) => {
                res.sendStatus(401);
            });
    }

    userSetting(req, res) {
        // console.log('Printing body', req.body.user_setting);
        return this.userService.updateUserSetting(req.user.id, req.body.user_setting).then((updated_user_setting) => {
            console.log(updated_user_setting);
            res.json(updated_user_setting);
        }).catch((err) => {
            res.sendStatus(401);
        });
    }
}

module.exports = UserRoutes;
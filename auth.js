var passport = require('passport');
var passportJWT = require('passport-jwt');
var config = require('./config');
var uuid = require('uuid');

//knex declaration
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

const UserService = require('./services/user-service');

const userService = new UserService(knex, uuid);

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(){
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('JWT')
    },(payload,done)=>{
        // console.log(payload);
        userService.getUser("", "", payload.id)
        .then(user=> {
            console.log(user);
            // console.log("user: " , user.id);
            if (user) {
                return done(null, {id: user[0].id});
            } else {
                return done(new Error("User not found"), null);
            }
        }).catch(err=> console.log(err));
    });
    
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}
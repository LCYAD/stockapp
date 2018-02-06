const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const uuid = require('uuid4');
const cors = require('cors');

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

//routes instance
var LoginRoutes = require ('./routes/login-routes');
var UserRoutes = require ('./routes/user-routes');
var PostRoutes = require ('./routes/post-routes');
var GetpostRoutes = require ('./routes/getpost-routes');

//service file
const UserService = require('./services/user-service');

//service instance
const userService = new UserService(knex, uuid);

//jwt import
const config = require('./config');

//declare express app
const app = express();

//middleware setting
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);  

//Routing
app.use('/api/login', new LoginRoutes(userService).router());
app.use('/api/user', new UserRoutes(userService).router());
app.use('/api/post', new PostRoutes(userService).router());
app.use('/api/getpost', new GetpostRoutes(userService).router());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8080);

module.exports = app;
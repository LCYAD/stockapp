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
var GetpostwithfollowRoutes = require ('./routes/getpost-routes');
var DeletepostRoutes = require ('./routes/deletepost-routes');
var BrokerRoutes = require ('./routes/broker-routes');
var CommentRoutes = require ('./routes/comment-routes')
var GetcommentRoutes = require ('./routes/getcomment-routes');
var ShowUserRoutes = require ('./routes/showuser-routes');
var GetfollowingRoutes = require ('./routes/getfollowing-routes');
var AddfollowingRoutes = require ('./routes/addfollowing-routes');

//service file
const UserService = require('./services/user-service');
const BrokerService = require('./services/broker-service');

//service instance
const userService = new UserService(knex, uuid);
const brokerService = new BrokerService(knex);

//jwt import
const config = require('./config');

//declare express app
const app = express();



const http = require('http').Server(app);
//const https    = require('https');
const io = require('socket.io')(http);
// socket IO ======================================================================
require('./oanda/sio.js').receiveIO(io); // passing io sockets to module
// Oanda API ======================================================================
const oanda = require('./oanda/oanda.js');
oanda.requestData();

// io.on('connection', (socket)=>{
//     console.log('A user has connected to the socket');
// });

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
app.use('/api/getpostwithfollow', new GetpostwithfollowRoutes(userService).router());
app.use('/api/deletepost', new DeletepostRoutes(userService).router());
app.use('/api/comment', new CommentRoutes(userService).router());
app.use('/api/getcomment', new GetcommentRoutes(userService).router());
app.use('/api/broker', new BrokerRoutes(brokerService).router());
app.use('/api/showuser', new ShowUserRoutes(userService).router());
app.use('/api/getfollowing', new GetfollowingRoutes(userService).router());
app.use('/api/addfollowing', new AddfollowingRoutes(userService).router());

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


// const server = require('http').Server(app);
// const io = require('socket.io')(server);

http.listen(8080);

module.exports = app;
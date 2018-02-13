let sio;
//const User = require('../models/user');

module.exports.receiveIO  = (io) => {
    sio = io;

    var count = 0;
    //var data = {"type":"PRICE","time":"2018-02-09T22:15:00.655886229Z","bids":[{"price":"1.22458","liquidity":10000000}],"asks":[{"price":"1.22566","liquidity":10000000}],"closeoutBid":"1.22443","closeoutAsk":"1.22581","status":"non-tradeable","tradeable":false,"instrument":"GBP_USD"}

    sio.on('connection', (socket)=>{
        console.log('A user has connected to the socket');
        // socket.on('addInstrument', (data)=>{
        //     User.getUserByUsername(data.username, (err, user)=>{
        //         if (err) throw err;
        //         user.instruments.push(data.instrument);
        //         user.save();
        //         //console.log(user);
        //     });
        // });
        // socket.on('removeInstrument', (data)=>{
        //     User.getUserByUsername(data.username, (err, user)=>{
        //         if (err) throw err;
        //         user.instruments.splice(user.instruments.indexOf(data.instrument),1);
        //         user.save();
        //         //console.log(user);
        //     });
        // })
        
        // //////Test simulator:
        // setInterval(function() {
        //     var random = (Math.random() * (0.020 - (-0.0200)) + (-0.0200));
        //     data = {"type":"PRICE","time": new Date(new Date(data['time']).getTime()+6000) ,"bids":[{"price": parseFloat(data['bids'][0]['price'])+random ,"liquidity":10000000}],"asks":[{"price":"1.22566","liquidity":10000000}],"closeoutBid":"1.22443","closeoutAsk":"1.22581","status":"non-tradeable","tradeable":false,"instrument":"GBP_USD"}
        //     console.log(data); 
        //     sio.emit('ticks', JSON.stringify(data));
        //     data2 = {"type":"PRICE","time": new Date(new Date(data['time']).getTime()+6000) ,"bids":[{"price": parseFloat(data['bids'][0]['price'])+random ,"liquidity":10000000}],"asks":[{"price":"1.22566","liquidity":10000000}],"closeoutBid":"1.22443","closeoutAsk":"1.22581","status":"non-tradeable","tradeable":false,"instrument":"EUR_USD"}
        //     console.log(data2);
        //     sio.emit('ticks', JSON.stringify(data2));
        // }, 6000)
        // /////////

    });
}

module.exports.emitTick = (data, instru) =>{
    // console.log(data);

   sio.emit('ticks', data);
}
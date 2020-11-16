var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({port: 8080, path: '/randomVoltage/'});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Msg received in server: %s ', message);
    });
    var interval = setInterval( function() {
        sendData(ws)
    },2000);
    console.log('New connection');
});

function sendData(ws) {
    console.log('Sending data');
    ws.send(randomInt(100,130));
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

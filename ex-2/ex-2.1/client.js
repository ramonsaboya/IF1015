var dgram = require('dgram');

var args = process.argv;
if (args.length != 5) {
    console.log("Run with: node client.js <name> <bind port> <target port>");
    process.exit(-1);
}
var name = args[2];
var bindPort = args[3];
var targetPort = args[4];

var socket = new dgram.createSocket('udp4');

socket.on('message', msg => {
    console.log(msg.toString('utf8'));
});

process.stdin.on('data', data => {
    var msg = data.toString().replace(/^\s+|\s+$/g, '');
    socket.send(Buffer.from(`${name}: ${msg}`, 'utf8'), targetPort);
});

socket.bind(bindPort);

const net = require('net');

var client = null;

const server = net.createServer(socket => {
    console.log('client connected');
    client = socket;

    socket.on('data', data => {
        console.log(`client: ${data.toString()}`);
    });

    function finish() {
        console.log('client disconnected');
        client = null;
    }

    socket.on('error', finish);
    socket.on('end', finish);
});

process.stdin.on('data', data => {
    if (!client) {
        console.log('client not connected');
        return;
    }

    const input = data.toString().replace(/^\s+|\s+$/g, '');
    client.write(input);
});

server.listen(8000);

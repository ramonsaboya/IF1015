const net = require('net');

const clients = {};

function broadcast(sender, msg) {
    Object.entries(clients)
        .filter(entry => entry[0] != sender)
        .forEach(entry => entry[1].write(`${sender}: ${msg}`));
}

const server = net.createServer(socket => {
    var name;

    socket.on('data', data => {
        const input = data.toString();
        const msgType = input.charAt(0);
        const msg = input.substr(1);

        if (msgType == '1') {
            name = msg;
            if (clients.hasOwnProperty(name)) {
                socket.destroy();
                return;
            }
            clients[name] = socket;
            console.log(`${name} connected`);
        } else {
            broadcast(name, msg);
        }
    });

    function finish() {
        console.log(`${name} disconnected`);
        delete clients[name];
    }

    socket.on('error', finish);
    socket.on('end', finish);
});

server.listen(8000);

const net = require('net');

const client = new net.Socket();

var connected = false;
var timeout = null;

function connect() {
    client.on('data', data => {
        console.log(`server: ${data.toString()}`);
    });

    client.connect(8000, 'localhost', () => {
        console.log('server connected');
        connected = true;

        if (timeout) clearTimeout(timeout);
    });

    function finish() {
        console.log('server disconnected');
        connected = false;
        client.destroy();

        reconnect();
    }

    function reconnect() {
        console.log('Trying to reconnect')
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            client.removeAllListeners();
            connect();
        }, 2000);
    }

    client.on('error', reconnect);
    client.on('end', finish);
}
connect();

process.stdin.on('data', data => {
    if (!connected) {
        console.log('server not connected');
        return;
    }

    const input = data.toString().replace(/^\s+|\s+$/g, '');
    client.write(input);
})

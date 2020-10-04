const net = require('net');

const client = new net.Socket();

var name = null;

var connected = false;
var timeout = null;

function connect() {
    client.on('data', data => {
        console.log(data.toString());
    });

    client.connect(8000, 'localhost', () => {
        console.log('server connected');
        connected = true;
        client.write(`1${name}`);

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

process.stdout.write('choose a name: ');
process.stdin.on('data', data => {
    const input = data.toString().replace(/^\s+|\s+$/g, '');

    if (!name) {
        name = input;
        connect();
        return;
    }

    if (!connected) {
        console.log('server not connected');
        return;
    }

    client.write(`0${input}`);
})

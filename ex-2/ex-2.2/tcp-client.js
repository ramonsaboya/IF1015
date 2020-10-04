const net = require('net');
const { marshallExpr, unmarshallResult } = require('./marshalling');
const { errorMessages } = require('./calculator');

const client = new net.Socket();

client.on('data', data => {
    const result = unmarshallResult(data);

    if (result.success) {
        console.log(result.value);
    } else {
        console.log(`error: ${errorMessages[result.error]}`);
    }
});

client.connect(8000, 'localhost', () => {
    process.stdin.on('data', data => {
        const input = data.toString().replace(/^\s+|\s+$/g, '');

        const buf = marshallExpr(input);

        client.write(buf);
    })
});

client.on('error', error => {
    console.log('server error:', error);
});

client.on('end', () => {
    console.log('server error: connection endend');
    process.exit();
});

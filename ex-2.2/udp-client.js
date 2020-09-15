const dgram = require('dgram');
const { marshallExpr, unmarshallResult } = require('./marshalling');
const { errorMessages } = require('./calculator');
const { time } = require('console');

const client = dgram.createSocket('udp4');

var timeout;

client.on('message', data => {
    const result = unmarshallResult(data);

    if (result.success) {
        console.log(result.value);
    } else {
        console.log(`error: ${errorMessages[result.error]}`);
    }

    clearTimeout(timeout);
});

process.stdin.on('data', data => {
    const input = data.toString().replace(/^\s+|\s+$/g, '');

    const buf = marshallExpr(input);

    client.send(buf, 8000, 'localhost');
    timeout = setTimeout(console.log, 1000, "it's been some time, maybe the server is down and didn't catch that.");
});

const dgram = require('dgram');
const { unmarshallExpr, marshallResult } = require('./marshalling');
const { evaluate } = require('./calculator')

const server = dgram.createSocket('udp4');

server.on('message', (data, rinfo) => {
    const input = unmarshallExpr(data);
        
    const result = evaluate(input);

    const buf = marshallResult(result);
    server.send(buf, rinfo.port, rinfo.address);
});

server.bind(8000);

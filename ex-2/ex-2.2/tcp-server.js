const net = require('net');
const { unmarshallExpr, marshallResult } = require('./marshalling');
const { evaluate } = require('./calculator')

const server = net.createServer(socket => {
    socket.on('data', data => {
        const input = unmarshallExpr(data);
        
        const result = evaluate(input);

        const buf = marshallResult(result);
        socket.write(buf);
    });
});

server.listen(8000);

const { grpc, pb } = require('./calculator_grpc');

const server = new grpc.Server();
server.addService(pb.CalculatorService.service, {
    Evaluate: ({ request }, callback) => {
        const {
            operation,
            x1,
            x2,
        } = request;

        switch (operation) {
        case '+':
            callback(null, { result: x1 + x2 });
            return;
        case '-':
            callback(null, { result: x1 - x2 });
            return;
        case '*':
            callback(null, { result: x1 * x2 });
            return;
        case '/':
            if (x2 == 0) {
                callback(null, { math_error: 'Division by zero' });
                return;
            }
            callback(null, { result: x1 / x2 });
            return;
        }

        callback(null, { math_error: 'Unknown operation'});
    }
})

server.bind('localhost:6666', grpc.ServerCredentials.createInsecure());
server.start();

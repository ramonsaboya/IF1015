const { grpc, pb } = require('./calculator_grpc');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const CalculatorService = pb.CalculatorService;
const client = new CalculatorService(
    'localhost:6666',
    grpc.credentials.createInsecure(),
);

readline.addListener('line', line => {
    split = line.split(' ');
    const operation = split[0];
    const x1 = Number(split[1]);
    const x2 = Number(split[2]);

    client.Evaluate(
        {
            operation,
            x1,
            x2,
        },
        (err, data) => {
            if (err) {
                console.log('couldn\'t connect. Maybe the server is down?');
                return;
            }

            const {
                response_type,
                result,
                math_error,
            } = data;
            if (response_type == 'math_error') {
                console.error(math_error);
                return;
            }
    
            console.log(result);
        }
    );
});

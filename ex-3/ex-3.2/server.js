const { grpc, pb } = require('./chat_grpc');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const server = new grpc.Server();

let user;

function ClientSend(call) {
    const message = call.request.message;
    console.log(`client: ${message}`);
}

function ServerSend(call) {
    user = call;
}

server.addService(pb.ChatService.service, {
    ClientSend,
    ServerSend,
})

readline.addListener('line', line => {
    if (!user) {
        console.log('no user connected');
        return;
    }

    user.write({
        message: line,
    });
});

server.bind('localhost:6666', grpc.ServerCredentials.createInsecure());
server.start();

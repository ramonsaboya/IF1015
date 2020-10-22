const { grpc, pb } = require('./chat_grpc');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ChatService = pb.ChatService;
const client = new ChatService(
    'localhost:6666',
    grpc.credentials.createInsecure(),
);

readline.addListener('line', line => {
    client.ClientSend({
        message: line,
    }, () => {});
});

function connect() {
    const channel = client.ServerSend();
    channel.on('data', request => {
        console.log(`server: ${request.message}`);
    });
    channel.on('error', _ => {
        console.log('server is down, trying again...');
        setTimeout(connect, 2000);
    });
}
connect();

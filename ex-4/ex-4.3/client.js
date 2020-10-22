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

function restartClient(username) {
    console.log('server is down, trying again...')
    setTimeout(startClient, 2000, username);
}

function startClient(username) {
    const channel = client.ListenChannel({ username });
    channel.on('data', ({ message }) => {
        console.log(message);
    });
    channel.on('error', () => restartClient(username));
    channel.on('end', process.exit);

    readline.removeAllListeners();
    readline.addListener('line', line => {
        client.SendChatMessage({
            username,
            message: line,
        }, _ => {});
    });
}

readline.question('Choose an username: ', username => {
    startClient(username);
});

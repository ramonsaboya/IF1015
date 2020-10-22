const { grpc, pb } = require('./chat_grpc');

const server = new grpc.Server();

const clients = {};

function broadcastMessage(username, message) {
    Object.entries(clients)
        .filter(entry => entry[0] != username)
        .forEach(entry => {
            entry[1].write({ message });
            console.log(message);
        });
}

function ListenChannel(call) {
    const username = call.request.username;

    if (clients.hasOwnProperty(username)) {
        call.write({ message: `${username} username is taken`});
        call.end();
        return;
    }

    clients[username] = call;
    console.log(`${username} connected`);

    call.on('cancelled', () => {
        broadcastMessage(username, `${username} disconnected`);
        delete clients[username];
    });

    call.write({
        message: `Current clients: ${ Object.keys(clients).length }`,
    });
}

function SendChatMessage(call) {
    const username = call.request.username;
    const message = call.request.message;

    broadcastMessage(username, `${username}: ${message}`);
}

server.addService(pb.ChatService.service, {
    ListenChannel,
    SendChatMessage,
})

server.bind('localhost:6666', grpc.ServerCredentials.createInsecure());
server.start();

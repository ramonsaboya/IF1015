# RPC multi-client chat

## Installing
To install required libraries, run:
```shell
npm install grpc @grpc/proto-loader
```

To run the application, open one console instances for the server;
```shell
# console 1
node server.js
```

And then any number of consoles for the clients
```shell
node client.js
```

Clients will ask for a username that will uniquely identify.

The server and its clients can disconnect and reconnect at any given time.

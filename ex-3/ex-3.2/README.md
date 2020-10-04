# RPC client-server p2p chat

## Installing
To install required libraries, run:
```shell
npm install grpc @grpc/proto-loader
```

To run the application, open two console instances and;
```shell
# console 1
node client.js
```
```shell
# console 2
node server.js
```

With the application running, any input will be sent to the other party, if available

Applications can be run in any arbitrary order
or be disconnected at any time and they will be able to connect again.

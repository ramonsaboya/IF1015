# TCP multi-client chat

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

**Note:** any client that attempts to connect with an existing name will be stuck in a reconnection loop.
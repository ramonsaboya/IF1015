# UDP client-server p2p chat

To run the application, open two console instances and;
```shell
# console 1
node client.js <name> <bind port> <target port>
```
```shell
# console 2
node client.js <name> <bind port> <target port>
```

- `name` is the unique identifier for the client. Both clients should have unique names.
- `bind port` is the port that the UDP server will be running on.
- `target port` is the port that the client will be trying to send messages to.

Clients should have mirrored ports, which means that if one is started with `7000 8000` for the ports, the other one should have `8000 7000`.


Clients applications can be run in any arbitrary order
or be disconnected at any time and they will be able to connect again.
Clients are not aware whether messages are being delivered (fire-and-forget)
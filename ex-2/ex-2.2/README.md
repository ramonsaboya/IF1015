# TCP/UDP RPC calculator

The application allow clients to evaluate simple math expressions on a remote server.

The client will keep `stdin` open and read lines of math expressions.
Math expressions in the prefix notation, as described by the following BNF:
```
    mathExpr = <op>" "<number>" "<number>
    op       = "+" | "-" | "*" | "/"
    number   = "" | <digit><number>
    digit    = "0" | "1" | "2" | "3" | "4" |
               "5" | "6" | "7" | "8" | "9"
```

**Note:** divisons by zero will result in an error.

# Running

## TCP
To run the application, open two console instances and;
```shell
# console 1
node tcp-server.js
```
```shell
# console 2
node tcp-client.js
```

**Note:** the server **MUST** be initialized first.

## UDP
To run the application, open two console instances and;
```shell
# console 1
node udp-server.js
```
```shell
# console 2
node udp-client.js
```

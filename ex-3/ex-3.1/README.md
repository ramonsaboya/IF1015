# RPC calculator

The application allow clients to evaluate simple math expressions on a remote server using rpc.

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

## Installing
To install required libraries, run:
```shell
npm install grpc @grpc/proto-loader
```

To run the application, open two console instances and;
```shell
# console 1
node server.js
```
```shell
# console 2
node client.js
```

After that, client console will be able to input expression as described above.

**Note:** the server **MUST** be initialized first.

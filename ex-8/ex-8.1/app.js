const amqp = require("amqplib/callback_api");
(global).WebSocket = require("ws");

const { webSocket } = require("rxjs/webSocket");
const { filter } = require("rxjs/operators");
const wsSubject = webSocket("ws://localhost:8080/randomVoltage/")
    .pipe(filter(v => 105 <= v && v <= 120));

const QUEUE = "rxjs";
var amqpChannel;

amqp.connect("amqp://localhost:5672", (err0, conn) => {
    if (err0) {
        throw err0;
    }

    conn.createChannel((err1, channel) => {
        if (err1) {
          throw err1;
        }
    
        channel.assertQueue(QUEUE, {
          durable: false
        });

        amqpChannel = channel;
      });
});

wsSubject.subscribe(voltage => {
    amqpChannel.sendToQueue(QUEUE, Buffer.from(voltage.toString()));
    console.log("%d sent to rabbitmq", voltage);
});

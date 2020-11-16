const amqp = require("amqplib/callback_api");
const RxAmqpLib = require("rx-amqplib");
const { zip } = require("rxjs");
(global).WebSocket = require("ws");

const { webSocket } = require("rxjs/webSocket");
const { filter } = require("rxjs/operators");
const wsSubject = webSocket("ws://localhost:8080/randomVoltage/");
const rmqSubject = RxAmqpLib.newConnection("amqp://localhost:5672/")
  .flatMap(connection => connection
    .createChannel()
    .flatMap(channel => channel.assertQueue("voltage", { durable: false }))
    .flatMap(reply => reply.channel.consume("voltage", { noAck: false }))
  )
  .map(msg => parseInt(msg.content.toString()))

const mergedSubject = zip(wsSubject, rmqSubject)
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

mergedSubject.subscribe(voltage => {
    amqpChannel.sendToQueue(QUEUE, Buffer.from(voltage.toString()));
    console.log("%d sent to rabbitmq", voltage);
});

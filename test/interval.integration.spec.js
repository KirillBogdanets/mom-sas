const amqplib = require("amqplib");
const { expect } = require("chai");
const dotenv = require("dotenv");
dotenv.config();

describe("interval producer", () => {
  let connection;

  before(async () => {
    const RABITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
    connection = await amqplib.connect(RABITMQ_URL, {
      clientProperties: {
        connection_name: "interval consumer test",
      },
    });
  });

  it('should route message to right queue', async () => {
    const EX = 'interval';
    const ROUTING_KEY = 'interval-message';
    const channel = await connection.createChannel();
    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, EX, ROUTING_KEY);
    const message = await new Promise(resolve => {
      channel.consume(q.queue, (message) => {
        channel.ack(message);
        resolve(message.content.toString())
      });
    });
    expect(message).to.include('hello world! item#:');
  });

  it("should route message to right queue with no ack message receiving", async () => {
    const EXCHANGE = "interval";
    const ROUTING_KEY = "interval-message";
    const channel = await connection.createChannel();
    const q = await channel.assertQueue("");
    await channel.bindQueue(q.queue, EXCHANGE, ROUTING_KEY);
    const consume = await channel.consume(q.queue, function (msg) {
      console.log(' [.] Print message %s', msg.content.toString());
    }, { noAck: true })
    expect(consume.consumerTag.length).to.be.above(10);
  });

  after(async () => {
    await connection.close();
  });
});

const amqplib = require("amqplib");
const { expect } = require("chai");
const dotenv = require("dotenv");
dotenv.config();

describe("upper case server", () => {
  let connection;

  before(async () => {
    const RABITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
    connection = await amqplib.connect(RABITMQ_URL, {
      clientProperties: {
        connection_name: "upper case client test",
      },
    });
  });

  it("should return upper cased string", async () => {
    const SQ = "source-queue";
    const channel = await connection.createChannel();
    const q = await channel.assertQueue("", {
      exclusive: true,
    });
    const messageContent = "test message";
    channel.sendToQueue(SQ, Buffer.from(messageContent), {
      replyTo: q.queue,
    });
    const message = await new Promise((resolve) => {
      channel.consume(q.queue, (message) => {
        if (message) resolve(message.content.toString());
      });
    });
    expect(message).to.equal("TEST MESSAGE");
  });

  after(async () => {
    await connection.close();
  });
});

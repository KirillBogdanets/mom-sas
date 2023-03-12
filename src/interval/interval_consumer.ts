import amqplib from "amqplib";

export async function consumeInterval(): Promise<void> {
  try {
    const EXCHANGE = "interval";
    const Q = "interval";
    const ROUTING_KEY = "interval-message";
    const RABITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
    const connection: amqplib.Connection = await amqplib.connect(RABITMQ_URL, {
      clientProperties: {
        connection_name: "interval consumer",
      },
    });
    const channel: amqplib.Channel = await connection.createChannel();
    await channel.assertQueue(Q);
    await channel.bindQueue(Q, EXCHANGE, ROUTING_KEY);
    await channel.consume(Q, (message: amqplib.ConsumeMessage | null) => {
      if (message) {
        console.log(message.content.toString());
        channel.ack(message);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

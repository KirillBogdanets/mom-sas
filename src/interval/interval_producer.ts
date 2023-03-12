import amqplib from "amqplib";
import { message } from "../utils/utils";

export async function produceInterval() {
  try {
    const EXCHANGE = "interval";
    const ROUTING_KEY = "interval-message";
    const RABITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
    const connection: amqplib.Connection = await amqplib.connect(RABITMQ_URL, {
      clientProperties: {
        connection_name: "interval producer",
      },
    });
    const channel: amqplib.Channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE, "direct");

    let i = 0;
    setInterval(async () => {
      await channel.publish(
        EXCHANGE,
        ROUTING_KEY,
        message(`hello world! item#:'${i++}'`)
      );
    }, 2000);
  } catch (err) {
    console.log(err);
  }
}

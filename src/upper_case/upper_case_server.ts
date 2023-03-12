import amqplib from "amqplib";
import { message } from "../utils/utils";

export async function upperCaseServer() {
  try {
    const SQ = "source-queue";
    const RABITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
    const connection: amqplib.Connection = await amqplib.connect(RABITMQ_URL, {
      clientProperties: {
        connection_name: "upper case server",
      },
    });
    const channel: amqplib.Channel = await connection.createChannel();
    await channel.assertQueue(SQ);
    channel.consume(SQ, function (msg: amqplib.ConsumeMessage | null) {
      if (msg) {
        channel.sendToQueue(
          msg.properties.replyTo,
          message(msg.content.toString().toUpperCase())
        );
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

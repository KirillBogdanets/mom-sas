import amqplib from "amqplib";
import { message } from "../utils/utils";

export async function toMOMUpperCase(messageContent: string): Promise<void> {
  try {
    const SQ = "source-queue";
    const RABITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
    const connection: amqplib.Connection = await amqplib.connect(RABITMQ_URL, {
      clientProperties: {
        connection_name: "upper case client",
      },
    });
    const channel: amqplib.Channel = await connection.createChannel();
    const ownQueue: amqplib.Replies.AssertQueue = await channel.assertQueue(
      "",
      { exclusive: true }
    );
    channel.sendToQueue(SQ, message(messageContent), {
      replyTo: ownQueue.queue,
    });

    channel.consume(
      ownQueue.queue,
      function (msg: amqplib.ConsumeMessage | null) {
        if (msg) {
          console.log(msg.content.toString());
          connection.close();
          process.exit(0);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

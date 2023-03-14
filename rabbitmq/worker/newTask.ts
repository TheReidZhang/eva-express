#!/usr/bin/env node
// Post a new task to the work queue

import amqp from 'amqplib';

const queue = 'task_queue';
const text = process.argv.slice(2).join(' ') || 'Hello World!';

(async () => {
  let connection: amqp.Connection | undefined;
  try {
    connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(text), { persistent: true });
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();

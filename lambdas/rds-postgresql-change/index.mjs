// Lambda runtime: Node.js 22.x
import { Client } from 'pg';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
};

const ses = new SESClient({ region: process.env.AWS_REGION });

export const handler = async () => {
  const client = new Client(dbConfig);
  await client.connect();

  // Get todos changed in the last 5 minutes
  const { rows } = await client.query(
    `SELECT * FROM "Todo" WHERE last_modified > NOW() - INTERVAL '5 minutes'`
  );

  await client.end();

  if (rows.length === 0) {
    return { status: 'ok', message: 'No changes' };
  }

  // Compose email
  const subject = 'Todo changes detected';
  const body = rows.map(todo => `- ${todo.title} (priority: ${todo.priority})`).join('\n');

  const params = {
    Destination: { ToAddresses: [process.env.NOTIFY_EMAIL] },
    Message: {
      Body: { Text: { Data: body } },
      Subject: { Data: subject }
    },
    Source: process.env.NOTIFY_EMAIL
  };

  await ses.send(new SendEmailCommand(params));

  return { status: 'ok', message: `Notified about ${rows.length} changes` };
};
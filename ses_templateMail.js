const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
};

// Create SES service object
const sesClient = new SESClient(SES_CONFIG);

// Function to send email using a template
const sendMail = async (templateName, recipientEmail) => {
  const sendTemplatedEmailCommand = new SendTemplatedEmailCommand({
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Source: process.env.AWS_SES_SENDER,
    Template: templateName,
    TemplateData: JSON.stringify({ name: "Test SES" }),
  });

  try {
    const res = await sesClient.send(sendTemplatedEmailCommand);
    console.log(`Email sent to ${recipientEmail}:`, res);
  } catch (err) {
    console.error(`Error sending email to ${recipientEmail}:`, err);
  }
};

// Function to send bulk emails
const sendBulkEmails = async (templateName, recipients) => {
  for (const recipient of recipients) {
    await sendMail(templateName, recipient);
    // Optionally, add a delay to avoid hitting rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

// Example usage
const templateName = "SES-Template"; // Your SES template name
const recipients = [
  "ginwan697@gmail.com",
  // "hozifa.dev@gmail.com",
  "test-md05slw0f@srv1.mail-tester.com",
];

sendBulkEmails(templateName, recipients);

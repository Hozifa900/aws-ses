const { SESClient, DeleteTemplateCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const deleteTemplate = async (templateName) => {
  const deleteTemplateCommand = new DeleteTemplateCommand({
    TemplateName: templateName,
  });

  try {
    const res = await sesClient.send(deleteTemplateCommand);
    console.log("Email template deleted successfully!", res);
  } catch (err) {
    console.error("Failed to delete template.", err);
  }
};

deleteTemplate("SES-Template");

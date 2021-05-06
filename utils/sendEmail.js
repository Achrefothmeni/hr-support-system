const nodemailer = require('nodemailer');

const sendEmail = async options => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST_1,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL_1,
      pass: process.env.SMTP_PASSWORD_1
    }
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL_1}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    
  }

  await transporter.sendMail(message);
}

module.exports = sendEmail;
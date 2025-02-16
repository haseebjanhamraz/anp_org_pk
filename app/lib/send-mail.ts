"use server";

import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_PORT = process.env.SMTP_SERVER_PORT; // Ensure this is a number in your .env file
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: parseInt(SMTP_SERVER_PORT, 10),
  secure: parseInt(SMTP_SERVER_PORT, 10) === 465, // Use secure connection if port is 465
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.verify();
    console.log("SMTP configuration verified.");

    const info = await transporter.sendMail({
      from: `"Awami National Party | ANP" <noreply@anp.org.pk>`,
      replyTo: email, // Optional: Include the original sender's email as the reply-to
      to: email || SITE_MAIL_RECIEVER,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Message Sent", info.messageId);
    console.log("Mail sent to", sendTo || SITE_MAIL_RECIEVER);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
}

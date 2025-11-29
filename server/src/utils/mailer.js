import nodemailer from "nodemailer";
import config from "../config/index.js";
import logger from "./logger.js";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"HMS" <${config.email.user}>`,
      to,
      subject,
      html
    });
    logger.info("Email sent successfully", info.messageId);
    return info;
  } catch (err) {
    logger.error("Email send failed", err);
    return null;
  }
};

const nodemailer = require("nodemailer");

const db = require("../config/database");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

router.post("/send-alert", async (req, res) => {
  const { name, email, message } = req.body;

  console.log(name, email, message, "mail details");

  if (!name || !email || !message) {
    return res
      .status(400)
      .send({ status: 400, message: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: "k.sssprahlad@gmail.com",
    subject: `Sai Prahlad — Message from ${name}`,
    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Hi <strong>Sai Prahlad</strong>,</p>
      <p>This is <strong>${name}</strong>.</p>
      <p>Here are my details:</p>
      <ul style="list-style: none; padding: 0;">
        <li style="margin:0"> <strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></li>
      </ul>
      <p><strong>Message:</strong></p>
      <p style="background: #f4f4f4; padding: 10px; border-radius: 6px;">${message}</p>
      <p>Kind regards,<br><strong>${name}</strong></p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", email);
    res
      .status(200)
      .send({ status: 200, message: "Alert email sent successfully." });
  } catch (error) {
    console.error("Email error:", error);
    res
      .status(500)
      .send({ status: 500, message: "Failed to send alert email." });
  }
});

module.exports = router;

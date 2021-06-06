const nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
  service: "gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
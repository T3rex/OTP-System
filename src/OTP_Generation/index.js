import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const generateOTP = (length) => {
  let otp = Math.floor(Math.random() * Math.pow(10, length));
  return otp;
};

export const sendMail = () => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: process.env.GMAIL_USERNAME,
    subject: "Your OTP Code",
    text: `Your OTP is ${generateOTP(6)}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const { createTransport } = require("nodemailer");
const redisClient = require("./redis_client");
const dotenv = require("dotenv");
dotenv.config();

const generateOTP = (length) => {
  let otp = Math.floor(Math.random() * Math.pow(10, length));
  return otp;
};

const storeOTP = async (otp) => {
  await redisClient.set(`otp:${otp}`, otp, {
    EX: 10,
  });
};

const sendOtpMail = (len) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.APP_PASSWORD,
    },
  });
  const otp = generateOTP(len);
  const mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: process.env.GMAIL_USERNAME,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        await storeOTP(otp);
        console.log("Email sent: " + info.response);
        resolve(info.response);
      }
    });
  });
};

const verifyOTP = (otp) => {
  return new Promise((resolve, reject) => {
    redisClient.get(`otp:${otp}`, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = {
  generateOTP,
  sendOtpMail,
  verifyOTP,
};

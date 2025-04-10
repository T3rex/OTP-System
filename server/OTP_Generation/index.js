const { createTransport } = require("nodemailer");
const redisClient = require("./redis_client");
const dotenv = require("dotenv");
dotenv.config();

const generateOTP = (length) => {
  let otp = Math.floor(Math.random() * Math.pow(10, length));
  return otp;
};

const storeOTP = async (otp) => {
  try {
    await redisClient.set(`otp:${otp}`, otp, {
      EX: 300,
    });
    console.log("OTP stored successfully");
    return true;
  } catch (err) {
    console.error("Error storing OTP:", err);
    return false;
  }
};

const sendOtpMail = (len) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SENDER_USERNAME,
      pass: process.env.APP_PASSWORD,
    },
  });
  const otp = generateOTP(len);
  const mailOptions = {
    from: process.env.GMAIL_SENDER_USERNAME,
    to: process.env.GMAIL_RECEIVER_USERNAME,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject(error);
      }

      try {
        await storeOTP(otp);
        console.log("Email sent:", info.response);
        resolve(info.response);
      } catch (err) {
        console.error("Error storing OTP:", err);
        reject(err);
      }
    });
  });
};

const verifyOTP = async (otp) => {
  try {
    const storedOtp = await redisClient.get(`otp:${otp}`);
    if (storedOtp) {
      // redisClient.del(`otp:${otp}`);
      console.log("OTP verified successfully");
      return true;
    } else {
      console.log("Invalid OTP");
      return false;
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendOtpMail,
  verifyOTP,
};

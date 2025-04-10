const express = require("express");
const cors = require("cors");
const { sendOtpMail, verifyOTP } = require("./OTP_Generation/index");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/send-otp", async (req, res) => {
  const len = req?.body?.length || 6;
  try {
    await sendOtpMail(len);
    res.status(200).json({
      message: "OTP sent successfully",
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send OTP",
      sucess: false,
    });
  }
});

app.get("verify-otp", async (req, res) => {
  const otp = req?.body?.otp;
  try {
    const isValid = await verifyOTP(otp);
    if (isValid) {
      res.status(200).json({
        message: "OTP verified successfully",
        success: true,
      });
    } else {
      res.status(400).json({ message: "Invalid OTP", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP", success: false });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));

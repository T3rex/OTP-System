const express = require("express");
const cors = require("cors");
const { sendOtpMail, verifyOTP } = require("./OTP_Generation/index");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = parseInt(process.env.PORT_NUMBER) || 3008;

app.get("/send-otp", async (req, res) => {
  const len = parseInt(req?.query?.length) || 6;
  try {
    await sendOtpMail(len);
    res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    console.error("Error in sendOtpMail:", error);
    res.status(500).json({ error: "Failed to send OTP", success: false });
  }
});

app.post("/verify-otp", async (req, res) => {
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

try {
  app.listen(port, () => console.log("Server running on port", port));
} catch (error) {
  console.error("Error starting server:", error);
}

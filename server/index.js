const express = require("express");
const cors = require("cors");
const { sendMail } = require("./OTP_Generation/index");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/send-otp", async (req, res) => {
  try {
    sendMail();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));

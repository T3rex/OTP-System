# 📧 OTP Backend API with Node.js, Redis & Nodemailer

This project is a lightweight backend service built with Express.js that sends and verifies OTPs via email using Nodemailer and temporarily stores them in Redis.

---

## 🚀 Features

- Generate and email OTPs using Gmail
- Store OTPs securely in Redis with TTL (5 minutes)
- Validate OTPs via API
- CORS and JSON body support
- Environment-based configuration

---

## 🛠️ Tech Stack

- Node.js + Express.js
- Redis
- Nodemailer (Gmail SMTP)
- dotenv for configuration
- CORS for cross-origin requests

---

## 📁 Folder Structure

```
project-root/
│
├── OTP_Generation/
│ ├── index.js # OTP logic (generate, send, verify)
│ └── redis_client.js # Redis client configuration
│
├── .env # Environment variables
├── server.js # Express server with API routes
└── package.json
```

---

## ⚙️ Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/your-username/otp-backend.git
cd otp-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root:

```
PORT_NUMBER=3000
GMAIL_SENDER_USERNAME=your-email@gmail.com
GMAIL_RECEIVER_USERNAME=recipient@gmail.com
APP_PASSWORD=your-app-password
REDIS_URL=redis://localhost:6379
```

> 💡 Use [App Passwords](https://support.google.com/accounts/answer/185833?hl=en) if 2FA is enabled on your Gmail account.

4. **Start Redis server (if not already running)**

```bash
redis-server
```

5. **Run the server**

```bash
node server.js
```

---

## 🔌 API Endpoints

### 📤 Send OTP

**GET** `/send-otp?length=6`

- Sends an OTP of specified length to the receiver email.
- Default length: `6`

**Response:**

```json
{
  "message": "OTP sent successfully",
  "success": true
}
```

---

### ✅ Verify OTP

**POST** `/verify-otp`

**Request Body:**

```json
{
  "otp": "123456"
}
```

**Response (on success):**

```json
{
  "message": "OTP verified successfully",
  "success": true
}
```

**Response (on failure):**

```json
{
  "message": "Invalid OTP",
  "success": false
}
```

---

## 🧪 How It Works

- A random OTP is generated using `Math.random()`
- The OTP is sent via email using Nodemailer (Gmail SMTP)
- It is stored in Redis with a TTL of 5 minutes (`EX: 300`)
- On verification, the OTP is checked against Redis
- The OTP is **not** deleted upon verification (can be enhanced)

---

## ✅ Improvements To Consider

- Auto-delete OTP after verification
- Rate limiting per user/email
- Support for phone-based OTP (via Twilio, etc.)
- Logging and better error reporting

---

## 📄 License

MIT License — free to use and modify.

# 🔐 OTP Verification System – Full Stack (Client + Server)

This project implements a full-stack OTP (One-Time Password) verification system using **React** for the frontend and **Node.js + Express + Redis + Nodemailer** for the backend.

---

## 🌐 Overview

- **Frontend**: React app for OTP input, submission, and feedback UI.
- **Backend**: Express server to generate, email, and verify OTPs, with Redis for temporary OTP storage.
- **Email Service**: Gmail via Nodemailer for sending OTPs.

---

## 📁 Project Structure

```
otp-verification-system/
├── client/                  # React frontend
│   ├── src/
│   │   └── App.js           # OTP UI logic
│   └── ...
├── server/                  # Express backend
│   ├── OTP_Generation/
│   │   └── index.js         # OTP logic (send, verify)
│   ├── redis_client.js      # Redis connection setup
│   ├── server.js            # Express app entry
│   └── .env                 # Environment variables
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

- React
- CSS (for basic styling)
- Fetch API

### Backend

- Node.js
- Express.js
- Nodemailer
- Redis
- dotenv
- CORS

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/otp-verification-system.git
cd otp-system
```

### 2️⃣ Backend Setup (Node.js + Redis)

```bash
cd server
npm install
```

#### Create `.env` file in `server/`:

```
PORT_NUMBER=3000
GMAIL_SENDER_USERNAME=your-email@gmail.com
GMAIL_RECEIVER_USERNAME=receiver-email@gmail.com
APP_PASSWORD=your-app-password
REDIS_URL=redis://localhost:6379
```

> ⚠️ Make sure Redis is installed and running.

#### Start the Backend

```bash
npm run dev
```

### 3️⃣ Frontend Setup (React)

```bash
cd ../client
npm install
npm run dev
```

> The React app will run on `http://localhost:5173` (or similar).

---

## 🔌 API Endpoints

### Send OTP

**GET** `/send-otp?length=6`

Sends an OTP via email and stores it in Redis.

### Verify OTP

**POST** `/verify-otp`

Body:

```json
{
  "otp": "123456"
}
```

---

## 🧪 How It Works

- User clicks "Send OTP" → email is sent with a 6-digit OTP.
- User enters OTP in the input boxes.
- On clicking "Verify OTP", it sends the OTP to backend for validation.
- If valid and not expired, backend responds with success.

---

## ✅ Future Improvements

- Auto-delete OTP from Redis after successful verification
- Add rate-limiting or CAPTCHA
- Add user-specific email/phone support
- Add phone OTP support via Twilio

---

## 📄 License

MIT License — free to use and modify.

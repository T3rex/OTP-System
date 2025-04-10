# 🔐 OTP Verification Front-End

A React-based OTP (One-Time Password) input and verification UI that allows users to receive and verify a 6-digit OTP via email. This project includes input navigation, paste support, and simple status feedback for OTP actions.

## 🚀 Features

- 6-digit OTP input with auto-focus and input validation  
- Intelligent backspace navigation  
- Full OTP pasting support (only at the first input)  
- Visual feedback on successful or failed verification  
- Integrates with backend API for:  
  - Sending OTP to email  
  - Verifying user-entered OTP  

## 🛠️ Tech Stack

- **Frontend:** React  
- **Backend :** Node.js / Express (API endpoints used: `/send-otp`, `/verify-otp`)

## 📦 Installation

```bash
git clone https://github.com/your-username/otp-verification-app.git
cd otp-system/client
npm install
npm run dev
```
Make sure the backend is running on http://localhost:3000.

## ⚙️ API Endpoints

 Replace or modify these endpoints according to your backend implementation.

 # Send OTP
 
 ```
GET /send-otp?length=6
```

# Response

```json
{
   message: "OTP verified successfully",
   success: true,
}
```

# Verify OTP

```json
{
   message: "OTP verified successfully",
   success: true,
}
```
# Request Body

```json
{ "otp": "123456" }
```

## 🧪 How it Works

- OTP input is split into 6 input fields.

- Only digits are allowed (0–9).

- On pasting a 6-digit OTP into the first field, the rest auto-fill.

- Successful operations show a temporary success message for 5 seconds.

## 📁 Project Structure

```bash
src/
  ├── App.js        # Main OTP component
  ├── index.js      # React DOM entry
  └── styles.css    # Add your custom styling here
```

## 📝 Customization

- To change OTP length, update OTP_INPUT_SIZE in App.js and align it with your backend logic.

- Modify API endpoint URLs inside verifyOTP and sendOTP functions.

## ✅ To-Do / Enhancements

- Add loading states for API calls

- Support for mobile number-based OTP

- Add unit tests for input behavior









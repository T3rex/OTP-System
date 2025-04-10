import { useEffect, useState, useRef } from "react";

const OTP_INPUT_SIZE = 6;

function App() {
  const initialOTP = new Array(OTP_INPUT_SIZE).fill("");
  const [otpInput, setOtpInput] = useState(initialOTP);
  const [emailSent, setEmailSent] = useState(false);
  const refArr = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return;
    if (value < 0 || value > 9) return;

    let arr = [...otpInput];
    arr[index] = value.slice(-1);
    setOtpInput(arr);

    value && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, index) => {
    if (index !== 0) return;
    const text = e.clipboardData.getData("text");

    const arr = text.split("");
    if (arr.length !== OTP_INPUT_SIZE) return;

    setOtpInput(arr);
    refArr.current[OTP_INPUT_SIZE - 1]?.focus();
  };

  const verifyOTP = async () => {
    const otp = otpInput.join("");
    const data = await fetch("http://localhost:3001/verify-otp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        otp: otp,
      },
    });
    const json = await data.json();
    alert(json.message);
  };

  const sendOTP = async () => {
    const data = await fetch("http://localhost:3001/send-otp");
    const json = await data.json();
    setEmailSent(json.success);
  };

  return (
    <div className="app-wrapper">
      <h1 className="otp-title">OTP Verification</h1>
      <form className="otp-form" onSubmit={(e) => e.preventDefault()}>
        <div className="otp-box-container">
          {otpInput.map((input, index) => (
            <input
              id={`otp-${index}`}
              className="otp-input"
              key={index}
              type="text"
              maxLength="1"
              value={input}
              ref={(input) => (refArr.current[index] = input)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              autoComplete="off"
            />
          ))}
        </div>
        {emailSent && <p>OTP sent succesfully</p>}
        <div className="otp-buttons">
          <button className="otp-button" type="button" onClick={verifyOTP}>
            Verify OTP
          </button>
          <button className="otp-button" type="button" onClick={sendOTP}>
            Send OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;

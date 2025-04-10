import { useState, useRef } from "react";

const OTP_INPUT_SIZE = 6;

function App() {
  const initialOTP = new Array(OTP_INPUT_SIZE).fill("");
  const [otpInput, setOtpInput] = useState(initialOTP);
  const [verified, setVerified] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [spinner, setSpinner] = useState(false);
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
    const data = await fetch("http://localhost:3008/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });
    const json = await data.json();
    if (json.success) {
      setVerified("success");
      setTimeout(() => {
        setVerified("");
      }, 5000);
    } else {
      setVerified("failed");
      setTimeout(() => {
        setVerified("");
      }, 5000);
    }
  };

  const sendOTP = async () => {
    setSpinner(true);
    const data = await fetch("http://localhost:3008/send-otp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();

    if (json.success) {
      setSpinner(false);
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    }
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
        {spinner && <span class="loader"></span>}
        {emailSent && (
          <p className="success-text">OTP has been sent to your email!</p>
        )}
        {verified === "success" && (
          <p className="success-text">OTP verified successfully!</p>
        )}
        {verified === "failed" && (
          <p className="error-text">OTP verification failed!</p>
        )}
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

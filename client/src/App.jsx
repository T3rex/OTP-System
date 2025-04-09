import { useEffect, useState } from "react";
import { useRef } from "react";

const OTP_INPUT_SIZE = 6;

function App(props) {
  const initialOTP = new Array(OTP_INPUT_SIZE).fill("");
  const [otpInput, setOtpInput] = useState(initialOTP);
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
    if (!e.target.value && e.key == "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, index) => {
    if (index != 0) return;
    const text = e.clipboardData.getData("text");

    const arr = text.split("");
    console.log(arr);
    if (arr.length != OTP_INPUT_SIZE) return;
    refArr.current[OTP_INPUT_SIZE - 1]?.focus();
    setOtpInput(arr);
  };

  const verifyOTP = () => {
    console.log("verifyOTP");
  };

  const sendOTP = async () => {
    const data = await fetch("http://localhost:3001/send-otp");
    const json = await data.json();
    console.log(json);
  };

  return (
    <div className="App">
      <h1>OTP System</h1>
      <div className="container">
        {otpInput.map((input, index) => (
          <input
            className="box"
            key={index}
            type="text"
            value={input}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => {
              handleChange(e, index);
            }}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
          />
        ))}
      </div>
      <button onClick={verifyOTP}>Verify OTP</button>
      <button onClick={sendOTP}>Send OTP</button>
    </div>
  );
}

export default App;

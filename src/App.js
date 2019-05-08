import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("05"); // initial 5 minutes
  const [isResend, setIsResend] = useState(false); // is otp resend button clicked
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isMainTimerUsed, setIsMainTimerUsed] = useState(true);

  useInterval(counter, isMainTimerUsed ? 1000 : null); //custom hook, stops interval if delay is null

  /**
   * Counter
   */
  function counter() {
    let min = Math.floor(secondsLeft / 60);
    let sec = secondsLeft - min * 60;

    if (min >= 2) {
      setIsResend(false);
    }

    setMinutes(min);
    setSeconds(sec);

    if (sec < 10) {
      setSeconds("0" + sec);
    }
    if (min < 10) {
      setMinutes("0" + min);
    }
    if (min < 2) {
      setIsResend(true);
    }
    if (min === 0 && sec === 0) {
      setIsMainTimerUsed(false);
    }

    setSecondsLeft(secondsLeft - 1);
  }

  /**
   *
   */
  function restartCountDown() {
    setIsMainTimerUsed(true);
    setMinutes("05");
    setSeconds("00");
    setSecondsLeft(300);
    setIsResend(false);
  }

  //custom hook from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div style={{ textAlign: "center" }}>
      {isMainTimerUsed ? (
        <label>
          Your OTP is expiring in{" "}
          <span style={{ fontWeight: "bold" }}>
            {minutes}:{seconds}
          </span>
        </label>
      ) : (
        <label>Your OTP has expired.</label>
      )}
      <br />
      <button disabled={!isResend} onClick={restartCountDown}>
        Resend OTP
      </button>
    </div>
  );
};

export default App;

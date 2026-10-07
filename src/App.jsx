import React, { useState, useEffect, useRef } from "react";

export default function App() {
  // 1. Live Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  // 2. Timer / Stopwatch State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Timer Handlers
  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setTimerSeconds(0);
  };

  const formatTimer = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        
        {/* LIVE CLOCK SECTION */}
        <div style={styles.section}>
          <p style={styles.subTitle}>CURRENT TIME</p>
          <h1 style={styles.clockText}>
            {currentTime.toLocaleTimeString()}
          </h1>
          <p style={styles.dateText}>
            {currentTime.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <hr style={styles.divider} />

        {/* DIGITAL TIMER SECTION */}
        <div style={styles.section}>
          <p style={styles.subTitle}>DIGITAL TIMER</p>
          <h1 style={styles.timerText}>{formatTimer(timerSeconds)}</h1>

          <div style={styles.buttonGroup}>
            <button
              onClick={handleStart}
              disabled={isRunning}
              style={{
                ...styles.button,
                ...styles.startBtn,
                opacity: isRunning ? 0.5 : 1,
                cursor: isRunning ? "not-allowed" : "pointer",
              }}
            >
              Start
            </button>

            <button
              onClick={handlePause}
              disabled={!isRunning}
              style={{
                ...styles.button,
                ...styles.pauseBtn,
                opacity: !isRunning ? 0.5 : 1,
                cursor: !isRunning ? "not-allowed" : "pointer",
              }}
            >
              Pause
            </button>

            <button
              onClick={handleStop}
              style={{
                ...styles.button,
                ...styles.stopBtn,
                cursor: "pointer",
              }}
            >
              Stop / Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    fontFamily: "'Courier New', Courier, monospace",
    margin: 0,
    padding: 0,
  },
  card: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  section: {
    margin: "12px 0",
  },
  subTitle: {
    fontSize: "0.85rem",
    letterSpacing: "2px",
    color: "#888888",
    margin: "0 0 8px 0",
  },
  clockText: {
    fontSize: "2.8rem",
    color: "#00e676",
    margin: "0",
    fontWeight: "bold",
  },
  dateText: {
    color: "#aaaaaa",
    fontSize: "0.85rem",
    marginTop: "6px",
    fontFamily: "Arial, sans-serif",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #333333",
    margin: "24px 0",
  },
  timerText: {
    fontSize: "3rem",
    color: "#00b0ff",
    margin: "0 0 20px 0",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
  },
  startBtn: {
    backgroundColor: "#a72887",
    color: "#ffffff",
  },
  pauseBtn: {
    backgroundColor: "#4107ff",
    color: "#000000",
  },
  stopBtn: {
    backgroundColor: "#19d344",
    color: "#ffffff",
  },
};
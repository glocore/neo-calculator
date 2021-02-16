import React from "react";
import "./styles.css";

export default function App() {
  const [display, setDisplay] = React.useState("0");
  const [operandBuffer, setOperandBuffer] = React.useState(0);
  const [operatorBuffer, setOperatorBuffer] = React.useState(null);
  const [awaitingNumber, setAwaitingNumber] = React.useState(true);

  const reset = () => {
    flashDisplay("0");
    setOperandBuffer(0);
    setOperatorBuffer(null);
    setAwaitingNumber(true);
  };

  const flashDisplay = (string = display) => {
    setDisplay("");
    setTimeout(() => {
      setDisplay(string);
    }, 50);
  };

  const handleNumberClick = (digit) => () => {
    if (display === "0") {
      setDisplay(digit);
      if (digit !== "0") {
        setAwaitingNumber(false);
      }
    } else if (awaitingNumber) {
      setDisplay(digit);
      setAwaitingNumber(false);
    } else if (digit === "." && display.indexOf(".") >= 0) {
      // do nothing
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOperatorClick = (operator) => () => {
    if (awaitingNumber) {
      flashDisplay();
    } else {
      solve();
    }

    setOperatorBuffer(operator);
  };

  const solve = () => {
    const parsedDisplay = parseFloat(display);
    let result = parsedDisplay;

    switch (operatorBuffer) {
      case "ADD":
        result = operandBuffer + parsedDisplay;
        break;

      case "SUBTRACT":
        result = operandBuffer - parsedDisplay;
        break;

      case "MULTIPLY":
        result = operandBuffer * parsedDisplay;
        break;

      case "DIVIDE":
        result = operandBuffer / parsedDisplay;
        break;

      default:
        break;
    }

    setOperandBuffer(result);
    flashDisplay(result.toString());
    setAwaitingNumber(true);
  };

  const flipSign = () => {
    if (awaitingNumber || display === "0") {
      // do nothing
    } else if (display[0] === "-") {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  return (
    <div className="main-border-wrap">
      <div className="main">
        <div className="display">{display}</div>
        <div className="grid">
          <button className="button" onClick={reset}>
            <div className="button-texture misc">
              <span className="button-label">C</span>
            </div>
          </button>
          <button className="button" onClick={flipSign}>
            <div className="button-texture misc">
              <span className="button-label">±</span>
            </div>
          </button>
          <button className="button">
            <div className="button-texture misc">
              <span className="button-label">%</span>
            </div>
          </button>
          <button className="button" onClick={handleOperatorClick("DIVIDE")}>
            <div className="button-texture operation">
              <span className="button-label">÷</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("7")}>
            <div className="button-texture number">
              <span className="button-label">7</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("8")}>
            <div className="button-texture number">
              <span className="button-label">8</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("9")}>
            <div className="button-texture number">
              <span className="button-label">9</span>
            </div>
          </button>
          <button className="button" onClick={handleOperatorClick("MULTIPLY")}>
            <div className="button-texture operation">
              <span className="button-label">×</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("4")}>
            <div className="button-texture number">
              <span className="button-label">4</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("5")}>
            <div className="button-texture number">
              <span className="button-label">5</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("6")}>
            <div className="button-texture number">
              <span className="button-label">6</span>
            </div>
          </button>
          <button className="button" onClick={handleOperatorClick("SUBTRACT")}>
            <div className="button-texture operation">
              <span className="button-label">−</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("1")}>
            <div className="button-texture number">
              <span className="button-label">1</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("2")}>
            <div className="button-texture number">
              <span className="button-label">2</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick("3")}>
            <div className="button-texture number">
              <span className="button-label">3</span>
            </div>
          </button>
          <button className="button" onClick={handleOperatorClick("ADD")}>
            <div className="button-texture operation">
              <span className="button-label">+</span>
            </div>
          </button>
          <button className="button zero" onClick={handleNumberClick("0")}>
            <div className="button-texture number">
              <span className="button-label">0</span>
            </div>
          </button>
          <button className="button" onClick={handleNumberClick(".")}>
            <div className="button-texture number">
              <span className="button-label">.</span>
            </div>
          </button>
          <button className="button" onClick={handleOperatorClick("SOLVE")}>
            <div className="button-texture operation">
              <span className="button-label">=</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

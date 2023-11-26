import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [counter, setCounter] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setCounter(counter + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setCounter(counter + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setCounter(counter + 1);
  };

  return (
    <div className="container">
      <h1>give feedback</h1>
      <div className="button-section">
        <button id="good" onClick={handleGood}>
          good
        </button>
        <button id="neutral" onClick={handleNeutral}>
          neutral
        </button>
        <button id="bad" onClick={handleBad}>
          bad
        </button>
      </div>
      <div>
        <h2>Statistics</h2>
        <div className="statistic-section">
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All {good + bad + neutral}</p>
          <p>
            Average{" "}
            {counter === 0
              ? "-"
              : (good * 1 + bad * -1 + neutral * 0) / counter}
          </p>
          <p>Positive {counter === 0 ? "-" : (good / counter) * 100} %</p>
        </div>
      </div>
    </div>
  );
};

export default App;

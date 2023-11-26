import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
};

export default App;

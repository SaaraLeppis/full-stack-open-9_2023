import { useState } from "react"
import Statistics from "./components/Statistics"
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [counter, setCounter] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setCounter(counter + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setCounter(counter + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setCounter(counter + 1)
  }

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

      <Statistics good={good} bad={bad} neutral={neutral} count={counter} />
    </div>
  )
}

export default App

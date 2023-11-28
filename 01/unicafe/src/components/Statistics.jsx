const Statistics = ({ good, bad, neutral, count }) => {
  return (
    <div className="statistic-section">
      <h2>Statistics</h2>
      {count > 0 && (
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All {good + bad + neutral}</p>
          <p>
            Average{" "}
            {count === 0 ? "-" : (good * 1 + bad * -1 + neutral * 0) / count}
          </p>
          <p>Positive {count === 0 ? "-" : (good / count) * 100} %</p>
        </>
      )}
      {count === 0 && <>No feedback given</>}
    </div>
  )
}

export default Statistics

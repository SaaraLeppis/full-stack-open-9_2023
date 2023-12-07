import StaticLine from "./StaticLine"

const Statistics = ({ good, bad, neutral, count }) => {
  const average = () => {
    return count === 0 ? "-" : (good * 1 + bad * -1 + neutral * 0) / count
  }
  const positives = () => {
    return count === 0 ? "-" : (good / count) * 100
  }
  return (
    <div className="statistic-section">
      <h2>Statistics</h2>
      {count > 0 && (
        <>
          <StaticLine text="Good" value={good} />
          <StaticLine text="Bad" value={bad} />
          <StaticLine text="Neutral" value={neutral} />
          <StaticLine text="All" value={count} />
          <StaticLine text="Average" value={average()} />
          <StaticLine
            text="Positive"
            value={positives()}
            count={count}
            sign="%"
          />
        </>
      )}
      {count === 0 && <>No feedback given</>}
    </div>
  )
}

export default Statistics

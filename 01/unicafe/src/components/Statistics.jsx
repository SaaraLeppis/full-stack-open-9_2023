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
        <table>
          <tbody>
            <StaticLine text="good" value={good} />
            <StaticLine text="bad" value={bad} />
            <StaticLine text="neutral" value={neutral} />
            <StaticLine text="all" value={count} />
            <StaticLine text="average" value={average()} />
            <StaticLine
              text="positive"
              value={positives()}
              count={count}
              sign="%"
            />
          </tbody>
        </table>
      )}
      {count === 0 && <>No feedback given</>}
    </div>
  )
}

export default Statistics

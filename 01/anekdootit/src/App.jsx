import { useEffect, useState } from "react"

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])
  const [mostVotes, setMostVotes] = useState(0)
  const [voteCalculator, setVoteCalculator] = useState(0)

  //on load create and fill the votes list with 0
  useEffect(() => {
    const voteArray = Array(anecdotes.length).fill(0)
    setVotes(voteArray)
  }, [])

  // when vote calculator changes, the index of most voted anecdote is set to mostVotes
  useEffect(() => {
    const indexOfMostVoted = votes.indexOf(Math.max(...votes))
    setMostVotes(indexOfMostVoted)
  }, [voteCalculator])

  //random number generated for new index of anecdote
  const selectNewHandler = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  //vote handler on click of vote button
  const voteHandler = () => {
    const currentVotes = [...votes]
    currentVotes[selected] += 1
    setVotes(currentVotes)
    setVoteCalculator(voteCalculator + 1)
  }

  return (
    <div className="container">
      <div className="select-section">
        {anecdotes[selected]}
        <button onClick={selectNewHandler}>next anecdote</button>
        <button onClick={voteHandler}>vote</button>
      </div>
      {voteCalculator !== 0 && (
        <div className="most-voted-section">
          <p>{anecdotes[mostVotes]}</p>
          <p>has {voteCalculator} votes </p>
        </div>
      )}
    </div>
  )
}

export default App
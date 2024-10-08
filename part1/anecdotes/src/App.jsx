import { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Anecdote = (props) => {
  return(
    <div>
      <div>{props.anecdotes}</div>
      <div>has {props.votes} votes</div>
    </div>
  )
}

const Button = (props) => {
  return(
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const AnecdoteMostVotes = (props) =>{
  if (props.votes == 0){
    return(<></>)
  }
  return(
    <>
      <div>{props.anecdote}</div>
      <div>has {props.votes} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const maxVotes = Math.max(...votes)
  const index = votes.indexOf(maxVotes)

  const next = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }


  return (
    <div>
      <Header text="Anecdote of the day"></Header>
      <Anecdote anecdotes={anecdotes[selected]} votes={votes[selected]}></Anecdote>
      <Button onClick={next} text = "next anecdote"></Button>
      <Button onClick={vote} text = "vote"></Button>
      <Header text="Anecdote with most votes"></Header>
      <AnecdoteMostVotes anecdote={anecdotes[index]} votes={maxVotes}></AnecdoteMostVotes>
    </div>
  )
}

export default App
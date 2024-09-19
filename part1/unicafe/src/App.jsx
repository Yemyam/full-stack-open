import { useState } from 'react'

const Average = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let average
  if ((good + neutral + bad) == 0){
    average = 0
  }
  else {
    average = (good - bad) / (good + neutral + bad)
  }
  return(
    <div>average {average}</div>
  )
}

const Positive = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let percent
  if ((good + neutral + bad) == 0){
    percent = 0
  }
  else {
    percent = (good / (good + neutral + bad)) * 100
  }
  return(
    <div>postitive {percent} %</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <Average good={good} bad={bad} neutral={neutral}></Average>
      <Positive good={good} bad={bad} neutral={neutral}></Positive>
    </div>
  )
}

export default App
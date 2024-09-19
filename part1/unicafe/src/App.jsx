import { useState } from 'react'

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let average = 0
  let percent = 0
  if ((good + neutral + bad) != 0) {
    average = (good - bad) / (good + neutral + bad)
    percent = (good / (good + neutral + bad)) * 100
    return(
      <>
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>average {average}</div>
        <div>positive {percent}</div>
      </>
    )
  }
  else{
    return(
      <>
      <h1>statistics</h1>
      <div>No feedback given</div>
      </>
    )
  }
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
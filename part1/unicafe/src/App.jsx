import { useState } from 'react'

const Button = (props) => {
  return(
    <>
      <button onClick={() => props.setter(props.value + 1)}>{props.text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let average = 0
  let positive = 0
  if ((good + neutral + bad) != 0) {
    average = (good - bad) / (good + neutral + bad)
    positive = (good / (good + neutral + bad)) * 100 + " %"
    return(
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}></StatisticLine>
            <StatisticLine text="neutral" value={neutral}></StatisticLine>
            <StatisticLine text="bad" value={bad}></StatisticLine>
            <StatisticLine text="average" value={average}></StatisticLine>
            <StatisticLine text="positive" value={positive}></StatisticLine>
          </tbody>
        </table>
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
        <Button setter={setGood} text="good" value={good}></Button>
        <Button setter={setNeutral} text="neutral" value={neutral}></Button>
        <Button setter={setBad} text="bad" value={bad}></Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
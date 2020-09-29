import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  return <tr>
          <td>{text}</td>
          <td>{value}</td>
         </tr>
}
const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <Statistic text="Good" value={props.good}/>
      <Statistic text="Neutral" value={props.neutral}/>
      <Statistic text="Bad" value={props.bad}/>
      <Statistic text="Total" value={props.total}/>
      <Statistic text="Average" value={props.average}/>
      <Statistic text="Positive" value={props.positive}/>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const avg = (good-bad)/total
  const pos = good/total
  const countGood = () => {
    setGood(good + 1)
  }
  const countNeutral = () => {
    setNeutral(neutral + 1)
  }
  const countBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>Give Your Feedback</h1>
        <Button handleClick={countGood} text='Good'/>
        <Button handleClick={countNeutral} text='Neutral'/>
        <Button handleClick={countBad} text='Bad'/>
        <h2>Statistics</h2>
        <Statistics total={total} good={good} neutral={neutral} bad={bad} average={avg} positive={pos}/>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

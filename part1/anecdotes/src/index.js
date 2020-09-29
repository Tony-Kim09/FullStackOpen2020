import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.handleClick}>
            {props.text}
         </button>
}

const Points = ({point}) => {
  return <div>
            This anecdotes has {point} Votes
         </div>
}

const App = (props) => {
  const LENGTH = props.anecdotes.length
  const points = Array.apply(null, new Array(LENGTH)).map(Number.prototype.valueOf,0)

  const [selected, setSelected] = useState(0)
  const [voted, setVote] = useState(points)
  const [highest, setHighest] = useState(0)

  const titleStyle = {
    color: 'red',
    fontWeight: 'bold'
  }




  const randomNumber = () => {
    setSelected(Math.round(Math.random() * (LENGTH-1)))
  }

  const givePoint = () => {
    const tempPoints = [...voted]
      tempPoints[selected] += 1
      for (let i = 0; i < LENGTH; i++){
        if (tempPoints[highest] < tempPoints[i]){
          setHighest(i)
        }
      }
      setVote(tempPoints)

  }




  return (
    <div>
      <h1 style={titleStyle} > Anecdotes of the Day </h1>
      <i>{props.anecdotes[selected]}</i>
      <br />
      <br />
      <Points point={voted[selected]}/>
      <br />
      <Button handleClick={randomNumber} text="Next Anecdotes"/>
      <Button handleClick={givePoint} text="Vote"/>
      <h1 style={titleStyle} > Most Voted Anecdotes </h1>
      <i>{props.anecdotes[highest]}</i>
      <Points point={voted[highest]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
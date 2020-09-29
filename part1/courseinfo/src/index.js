import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}
const Content = ({arr}) => {
  return (
    <div>
      <Part part={arr[0].name} exercise={arr[0].exercises}/>
      <Part part={arr[1].name} exercise={arr[1].exercises}/>
      <Part part={arr[2].name} exercise={arr[2].exercises}/>
    </div>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Total = ({total}) => {
  return (
    <p>Number of exercises: {total}</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises 

  return (
    <div>
      <Header course={course.name}/>
      <Content arr={course.parts}/>
      <Total total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
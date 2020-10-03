import React from 'react'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}
const Content = ({classList}) => {
  return (
    <div>
      {classList.map(x =>
        <Part key={x.id} part={x.name} exercise={x.exercises}/>
      )}
    </div>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Total = ({total}) => {
  const sum = total.map(x => x.exercises)
                   .reduce((acc, val) => {
    return acc + val
  }, 0)
  return (
    <p><b>Number of exercises: {sum}</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content classList={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default Course

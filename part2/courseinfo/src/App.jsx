const Header = ({course}) => {
  return(
    <h1>{course}</h1>
  )
}

const Part = ({part, exercises}) => {
  return(
    <p>{part} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => <Part key = {part.id} part={part.name} exercises={part.exercises}></Part>)}
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <b>total of {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercises</b>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course = {course.name}></Header>
      <Content parts = {course.parts}></Content>
      <Total parts = {course.parts}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
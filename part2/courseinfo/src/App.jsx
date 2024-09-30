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
    <b>total of {parts.reduce((total, current) => total + current.exercises,0)} exercises</b>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      {courses.map(course => <Course key = {course.id} course = {course}></Course>)}
    </div>
  )
}

export default App
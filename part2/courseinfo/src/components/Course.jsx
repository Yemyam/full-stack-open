const Header = ({course}) => {
    return(
      <h2>{course}</h2>
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

  export default Course
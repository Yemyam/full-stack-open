import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const showWhenView = {display: view ? '' : 'none'}
  const hideWhenView = {display: view ? 'none' : ''}

  const toggleView = () => {
    setView(!view)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author}&nbsp;
    <button onClick={toggleView} style={hideWhenView}>view</button>
    <button onClick={toggleView} style={showWhenView}>hide</button>
    <div style={showWhenView}>
      {blog.url}
      <br></br>
      likes {blog.likes} <button>like</button>
      <br></br>
      {blog.user.name}
    </div>
  </div>
  )  
}

export default Blog
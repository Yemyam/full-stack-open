import { useState, useEffect } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  const showWhenView = {display: view ? '' : 'none'}
  const hideWhenView = {display: view ? 'none' : ''}
  const showWhenLiked = {display: liked ? '' : 'none'}
  const hideWhenLiked = {display: liked ? 'none' : ''}

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

  const handleLike =  async(event) => {
    event.preventDefault()
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogs.update(newBlog)
    setLikes(blog.likes+1)
    setLiked(true)
  }

  useEffect(() => {
    setLikes(blog.likes)
  }, [])

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author}&nbsp;
    <button onClick={toggleView} style={hideWhenView}>view</button>
    <button onClick={toggleView} style={showWhenView}>hide</button>
    <div style={showWhenView}>
      {blog.url}
      <br></br>
      likes {likes} <button onClick={handleLike} style={hideWhenLiked}>like</button>
      <button disabled style={showWhenLiked}>liked</button>
      <br></br>
      {blog.user.name}
    </div>
  </div>
  )  
}

export default Blog
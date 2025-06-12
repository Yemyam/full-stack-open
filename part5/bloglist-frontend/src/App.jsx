import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setMessage('successful login!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setMessage('successfully logged out!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception){
      console.log(exception)
      setMessage(`Bad Request: title, author and url need to be filled out`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <div>
    <h1>log into application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
        type='text'
        value={username}
        name='username'
        autoComplete='off'
        onChange={({ target }) => setUsername(target.value)}
        >
        </input>
      </div>
      <div>
        password
        <input 
        type='text'
        value={password}
        name='password'
        autoComplete='off'
        onChange={({ target }) => setPassword(target.value)}
        >
        </input>
      </div>
      <button type='submit'>login</button>
    </form>
    </div>
  )

  const blogInfo = () => (
    <div>
      <h1>blogs</h1>
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <br></br>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
          type='text'
          value={title}
          name='title'
          autoComplete='off'
          onChange={({ target }) => setTitle(target.value)}
          >
          </input>
        </div>
        <div>
          author:
          <input
          type='text'
          value={author}
          name='author'
          autoComplete='off'
          onChange={({ target }) => setAuthor(target.value)}
          >
          </input>
        </div>
        <div>
          url:
          <input
          type='text'
          value={url}
          name='rl'
          autoComplete='off'
          onChange={({ target }) => setUrl(target.value)}
          >
          </input>
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


  return (
    <div>
      <Notification message={message}></Notification>
      {user === null 
      ? loginForm() 
      : blogInfo()}
    </div>
  )
}

export default App
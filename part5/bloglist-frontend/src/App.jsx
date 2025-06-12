import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
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
        name='Password'
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <div>{errorMessage}</div>
      {user === null 
      ? loginForm() 
      : blogInfo()}
    </div>
  )
}

export default App
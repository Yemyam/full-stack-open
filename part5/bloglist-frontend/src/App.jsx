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


  useEffect(() => {
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
      <div>{user.name} logged in</div>
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
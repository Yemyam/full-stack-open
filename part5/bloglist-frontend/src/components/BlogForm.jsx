import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        createBlog({ title, author, url})

        setTitle('')
        setAuthor('')
        setUrl('')
        }

  return (
    <div>
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
          name='url'
          autoComplete='off'
          onChange={({ target }) => setUrl(target.value)}
          >
          </input>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
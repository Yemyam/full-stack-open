const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
const blog = new Blog(request.body)

const savedBlog = await blog.save()
response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  else {
    if (request.body.title) {
      blog.title = request.body.title
    }
    if (request.body.author) {
      blog.author = request.body.author
    }
    if (request.body.url) {
      blog.url = request.body.url
    }
    if (request.body.likes) {
      blog.likes = request.body.likes
    }
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  }
})

module.exports = blogsRouter
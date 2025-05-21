const assert = require('node:assert')
const { test, after, beforeEach, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'testing1',
        author: 'tester1',
        url: 'testing1url.com',
        likes: 1
    },
    {
        title: 'testing2',
        author: 'tester2',
        url: 'testin2gurl.com',
        likes: 5
    }
]

beforeEach( async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('all notes are returned', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have unique identifier named id', async () => {
    const blogs = await Blog.find({})
    assert.ok(blogs[0].id)
})

test('blog post can be added', async () => {
    const newBlog = {
        title: 'testing3',
        author: 'tester3',
        url: 'testing3url.com',
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)
    const authors = response.body.map(blog => blog.author)
    const urls = response.body.map(blog => blog.url)
    const likes = response.body.map(blog => blog.likes)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes('testing3'))
    assert(authors.includes('tester3'))
    assert(urls.includes('testing3url.com'))
    assert(likes.includes(4))
})

test('defaults to zero likes if likes are missing', async () => {
    const newBlog = {
        title: 'testing3',
        author: 'tester3',
        url: 'testing3url.com',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(blog => blog.likes)
    assert.strictEqual(likes[2], 0)
})

after(async () => {
  await mongoose.connection.close()
})
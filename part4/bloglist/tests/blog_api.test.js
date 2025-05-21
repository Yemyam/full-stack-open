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

after(async () => {
  await mongoose.connection.close()
})
const assert = require('node:assert')
const { test, after, beforeEach, before, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { request } = require('node:http')

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

const initialUsers = [
    {
        username: "Yamyam",
        name: "Ethan Braum",
        password: "123456",
    },
    {
        username: "ethan403",
        name: "Bobby",
        password: "abcdef"
    }
]

beforeEach( async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(initialUsers[0])
    await api.post('/api/users').send(initialUsers[1])
    const users = await api.get('/api/users')
    await Blog.deleteMany({})
    blogs = [
        {
            title: 'testing1',
            author: 'tester1',
            url: 'testing1url.com',
            user: users.body[0].id,
            likes: 1
        },
        {
            title: 'testing2',
            author: 'tester2',
            url: 'testin2gurl.com',
            user: users.body[1].id,
            likes: 5
        }
    ]
    let blogObject = new Blog(blogs[0])
    await blogObject.save()
    blogObject = new Blog(blogs[1])
    await blogObject.save()
})

test('all blogs are returned', async () => { 
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

describe('Adding blogs', async () => {
    test('blog post can be added', async () => {
        const login = await api
            .post('/api/login')
            .send({
                username: initialUsers[0].username,
                password: initialUsers[0].password
            })
            .expect(200)
        const users = await api.get('/api/users')
        const newBlog = {
            title: 'testing3',
            author: 'tester3',
            url: 'testing3url.com',
            user: users.body[0].id,
            likes: 4
        }

        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${login._body.token}`)
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

    test('Creating blog without token', async () => {
    const users = await api.get('/api/users')
    const newBlog = {
        title: 'testing3',
        author: 'tester3',
        url: 'testing3url.com',
        user: users.body[0].id,
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
    
    test('defaults to zero likes if likes are missing', async () => {
        const login = await api
            .post('/api/login')
            .send({
                username: initialUsers[0].username,
                password: initialUsers[0].password
            })
            .expect(200)
        const users = await api.get('/api/users')
        const newBlog = {
            title: 'testing3',
            author: 'tester3',
            url: 'testing3url.com',
            user: users.body[0].id,
        }

        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${login._body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const likes = response.body.map(blog => blog.likes)
        assert.strictEqual(likes[2], 0)
    })
    
    test('bad request if title or url are missing', async () => {
        const login = await api
            .post('/api/login')
            .send({
                username: initialUsers[0].username,
                password: initialUsers[0].password
            })
            .expect(200)
        const users = await api.get('/api/users')

        const missingUrl = {
            title: 'testing3',
            author: 'tester3',
            user: users.body[0].id,
            likes: 4
        }
    
        const missingTitle = {
            author: 'tester3',
            url: 'testing3url.com',
            user: users.body[0].id,
            likes: 6
        }
        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${login._body.token}`)
            .send(missingUrl)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${login._body.token}`)
            .send(missingTitle)
            .expect(400)
    })
})

describe('Deleting blogs', async () => {
    test('Deleting a blog that exists', async () => {
        const login = await api
            .post('/api/login')
            .send({
                username: initialUsers[0].username,
                password: initialUsers[0].password
            })
            .expect(200)

        const response = await api.get('/api/blogs')
        await api
            .delete(`/api/blogs/${response.body[0].id}`)
            .set('authorization', `Bearer ${login._body.token}`)
        const response2 = await api.get('/api/blogs')
        assert.strictEqual(response2.body.length, 1)
        assert.notEqual(response2.body[0].id, response.body[0].id)
    })

    test('Deleting a blog that does not exist', async () => {
        const login = await api
            .post('/api/login')
            .send({
                username: initialUsers[0].username,
                password: initialUsers[0].password
            })
            .expect(200)
        const fakeId = '123456abcdefg'
        await api
            .delete(`/api/blogs/${fakeId}`)
            .set('authorization', `Bearer ${login._body.token}`)
            .expect(400)
    })
})

describe('Updating blog posts', async () => {
    test('Updating a blog post that exists', async () => {
        const updatedLikes = {
            likes: 12
        }
        const response = await api.get('/api/blogs')
        await api
            .put(`/api/blogs/${response.body[0].id}`)
            .send(updatedLikes)
            .expect(201)
        const response2 = await api.get('/api/blogs')
        assert.strictEqual(response.body[0].likes , 1)
        assert.strictEqual(response2.body[0].likes , 12)
    })

    test('Updating blog post that does not exist', async () => {
        const fakeId = '123456abcdefg'
        const updatedLikes = {
            likes: 12
        }
        await api
            .put(`/api/blogs/${fakeId}`)
            .send(updatedLikes)
            .expect(400)
    })
})

describe('Adding an invalid user', async () => {
    test('Adding a user with a duplicate username', async () => {
        const duplicateUser = {
            username: "Yamyam",
            name: "Joey",
            password: "123"
        }
        const response = await api
            .post('/api/users')
            .send(duplicateUser)
            .expect(400)

        assert.strictEqual(response.body.error, 'expected `username` to be unique')
    })
    test('Username is too short', async () => {
        const usernameTooShort = {
            username: "Bo",
            name: "Bobby",
            password: "12345",
        }
        response = await api
            .post('/api/users')
            .send(usernameTooShort)
            .expect(400)

        assert.ok(response.body.error.includes("User validation failed"))
    })
    test('Password is too short', async () => {
        const passwordTooShort = {
            username: "Boo",
            name: "Bobby",
            password: "12",
        }
        response = await api
            .post('/api/users')
            .send(passwordTooShort)
            .expect(403)

        assert.strictEqual(response.body.error , "password must be at least 3 characters long.")
    })
})

after(async () => {
  await mongoose.connection.close()
})
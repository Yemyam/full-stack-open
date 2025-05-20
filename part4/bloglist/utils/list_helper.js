const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    for (const blog of blogs) {
        likes = likes + blog.likes
    }
    return likes
}

const favoriteBlog = (blogs) => {
    let favBlog = {likes: 0}
    for (const blog of blogs) {
        if (blog.likes >= favBlog.likes) {
            favBlog = blog
        }
    }
    if (favBlog.likes === 0){
        return null
    }
    return favBlog
}

const mostBlogs = (blogs) => {
    let authors = []
    let found = false
    for (const blog of blogs) {
        for (const author of authors) {
            if (author.author === blog.author) {
                author.blogs = author.blogs + 1
                found = true
            }
        }
        if (found === false) {
            let newAuthor = {
                author: blog.author,
                blogs: 1
            }
            authors.push(newAuthor)
        }
        found = false
    }
    let topAuthor = {author: null, blogs: 0}
    for (const author of authors) {
        if (author.blogs >= topAuthor.blogs) {
            topAuthor = author
        }
    }
    if (topAuthor.blogs === 0) {
        return null
    }
    return topAuthor
}

const mostLikes = (blogs) => {
    let authors = []
    let found = false
    for (const blog of blogs) {
        for (const author of authors) {
            if (author.author === blog.author) {
                author.likes = author.likes + blog.likes
                found = true
            }
        }
        if (found === false) {
            let newAuthor = {
                author: blog.author,
                likes: blog.likes
            }
            authors.push(newAuthor)
        }
        found = false
    }
    let topAuthor = {author: null, likes: 0}
    for (const author of authors) {
        if (author.likes >= topAuthor.likes) {
            topAuthor = author
        }
    }
    if (topAuthor.likes === 0) {
        return null
    }
    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
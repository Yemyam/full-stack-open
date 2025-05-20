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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
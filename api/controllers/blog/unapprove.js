module.exports = async function (req, res) {
    const blogId = req.param("blogId")
    try {
        const blog = await Blog.findOne({id: blogId})
        const blogRecord = await Blog.update({id: blogId}).set({isReviewed: false, updatedAt: blog.updatedAt
    })
    res.end()
    } catch(err) {
        res.serverError(err.toString())
    }
};
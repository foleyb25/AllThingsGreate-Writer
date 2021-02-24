module.exports = async function (req, res) {
    const blogId = req.param("blogId")
    try {
        const blogRecord = await Blog.update({id: blogId}).set({isReviewed: true
    })
        // return res.redirect(`/blog/review/${blogId}`)
        res.end()
    } catch(err) {
        res.serverError(err.toString())
    }
};
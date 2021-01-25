module.exports = async function(req, res) {
    console.log("Lets delete our blog object")

    const blogId = req.param('blogId')
    console.log("Deleting blog with id: " + blogId)

    try {
        await Blog.destroy({id: blogId, writer: req.me.userId})
        res.end()
    } catch (err) {
        res.serverError(err.toString())
    }
}
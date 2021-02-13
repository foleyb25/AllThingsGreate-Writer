
module.exports = async function(req, res) {
    const commentid = req.param('commentid')

    if(!commentid) {
        return res.end()
    }
    // Delete Comment from DB
    try {
        const comment = await Comment.findOne({id: commentid})
        const blog = await Blog.findOne({id: comment.blog})
        await Comment.destroyOne({id: commentid})
        await Blog.update({id: blog.id}).set({numComments: blog.numComments-1, updatedAt: blog.updatedAt})
    } catch(err) {
        res.serverError(err.toString())
    }
    

    res.end()
}
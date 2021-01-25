module.exports = async function(req, res) {
    const blogId = req.param('id')
    console.log("Create comment here: " + blogId)

    // store a comment in our database
    await Comment.create({
        text: req.body.text,
        post: blogId,
        user: req.session.userId,
    })

    res.redirect('/blog/' + blogId)
}
module.exports = async function(req, res) {
  //do an update. need to changeto PUT request in future
    const blogId = req.param("blogId")
    const bodyText = req.body.bodyText
    const titleText = req.body.titleText
    const categoryText = req.body.categoryText
    const previewText = req.body.previewText
    try {
        await Blog.update({id: blogId}).set({bodyHTML: bodyText, title: titleText,
        category: categoryText, previewText: previewText,
        })
        const blog = await Blog.findOne({id: blogId})
        const sanitizedBlog = JSON.parse(JSON.stringify(blog))
        return res.redirect(`/blog/edit/${blogId}`);
    } catch(error) {
        res.serverError(error.toString())
    }
};
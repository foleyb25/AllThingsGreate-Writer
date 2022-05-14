module.exports = async function(req, res) {
    const blogBody = req.body.bodyText
    const blogTitle = req.body.titleText
    // const blogPreview = req.body.previewText
    var blogCategory = req.body.categoryText

    //if no category was input, default to 'all things great'
    if(blogCategory == '') {
        blogCategory = 'AllThingsGreat';
    }

    console.log("Create blog object with text: " + blogBody)

    // const file = req.file(fileName)
    const file = req.file("imageFile")

    try {
        
        if (file.isNoop) {
            file.upload({noop: true})
            return res.send("A file must be selected")
        } else {
            if (blogBody == "") {
                return res.send("Must include content in blog")
            }
            const fileUrl = await sails.helpers.uploadfile(file)

            const userId = req.session.userId
    
            const blogRecord = await Blog.create({bodyHTML: blogBody,
                title: blogTitle,
                writer: userId,
                imageUrl: fileUrl,
                category: blogCategory,
            }).fetch()
            
            res.redirect('/')
        } 
        res.end()
    } catch (err) {
        res.serverError(err.toString())
    }
}
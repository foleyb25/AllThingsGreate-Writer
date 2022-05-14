module.exports = async function(req,res) {
    pageNum = req.param('pageNum');
    try {
      const blogs = await Blog.find({})
      .sort('createdAt DESC')
      .populate('writer')
      .paginate(pageNum, 25)
      const sanitizedBlogs = JSON.parse(JSON.stringify(blogs))
      const isMore = sanitizedBlogs.length == 25 ? true : false
  
    return res.send({
        blogs: sanitizedBlogs,
        pageNum: pageNum,
        isMore: isMore
    });
    //if initial entry to homepage
    } catch(err) {
      res.serverError(err.toString())
    }
  };
module.exports = async function(req,res) {

  try {
    const blogs = await Blog.find({writer: req.session.userId})
    .sort('createdAt DESC')
    .populate('writer')
    .paginate(0, 25)
    const sanitizedBlogs = JSON.parse(JSON.stringify(blogs))
    const isMore = sanitizedBlogs.length == 25 ? true : false

    return res.view("pages/homepage", {
      blogs: sanitizedBlogs,
      pageNum: 0,
      isMore: isMore
    });

    
  } catch(err) {
    res.serverError(err.toString())
  }
};

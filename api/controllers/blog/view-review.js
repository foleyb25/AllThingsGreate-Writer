module.exports = async function(req,res) {

  try {
    //Find all the blogs as super admin
    const blogs = await Blog.find({})
    .sort('createdAt DESC')
    .populate('writer')
    .paginate(0, 25)
    const sanitizedBlogs = JSON.parse(JSON.stringify(blogs))
    const isMore = sanitizedBlogs.length == 25 ? true : false

    return res.view("pages/blog/review", {
      blogs: sanitizedBlogs,
      pageNum: 0,
      isMore: isMore
    });

    
  } catch(err) {
    res.serverError(err.toString())
  }
};

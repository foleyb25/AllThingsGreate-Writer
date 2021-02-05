module.exports = async function(req,res) {
  try {
    const blogsToReview = await Blog.find({}).sort(
      [ {isReviewed: 'ASC'}, {createdAt: 'ASC'}]
    ).populate("writer")
    const sanitizedBlogs = JSON.parse(JSON.stringify(blogsToReview))

    //compute pctg here

    return res.view("pages/blog/review", {
      blogs: sanitizedBlogs,
      pct: 50,
    });
  } catch(err) {
    res.serverError(err.toString())
  }
};

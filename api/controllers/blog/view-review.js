module.exports = async function(req,res) {
  try {
    const blogsToReview = await Blog.find({isReviewed: false})
    .sort("createdAt ASC").populate("writer")
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


    // friendlyName: 'View review blog blogs',
  
  
    // description: 'Displays page to review blog blogs: For super Admin',
  
  
    // exits: {
  
    //   success: {
    //     statusCode: 200,
    //     viewTemplatePath: 'pages/blog/review'
    //   },
  
    //   redirect: {
    //     responseType: 'redirect',
    //     description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    //   },
  
    // },
  
  
  //   fn: async function () {
  //     try {
  //       const blogsToReview = await Blog.find({isReviewed: false})
  //       .sort("createdAt ASC").populate("writer")
  //       const sanitizedBlogss = JSON.parse(JSON.stringify(blogsToReview))
  //       return {
  //         blogs: sanitizedBlogs,
  //       };
  //     } catch(err) {
  //       this.res.serverError(err.toString())
  //     }
  //   }
  // };
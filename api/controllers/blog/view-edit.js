module.exports = async function(req,res) {
  try {
    const blogId = req.param('blogId')
    const blog = await Blog.findOne({id: blogId})
    const sanitizedBlog = JSON.parse(JSON.stringify(blog))
    return res.view("pages/blog/edit", {
      blog: sanitizedBlog,
    });
  } catch(err) {
    res.serverError(err.toString())
  }
};

    // friendlyName: 'View Edit blog blog',
  
  
    // description: 'Displays page to edit a blog blog',
  
  
    // exits: {
  
    //   success: {
    //     statusCode: 200,
    //     responseType: 'view',
    //     viewTemplatePath: 'pages/blog/edit'
    //   },

    //   redirect: {
    //     responseType: 'redirect',
    //     description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    //   },
  
    // },
  
  
//     fn: async function () {
    
  
  
// };
module.exports = async function(req,res) {
  const blogId = req.param("blogId")

  try {
    const blog = await Blog.findOne({id: blogId}).populate("writer")
    const sanitizedBlog = JSON.parse(JSON.stringify(blog))
    return res.view("pages/blog/review-single", {
        blog: sanitizedBlog,
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
    //     viewTemplatePath: 'pages/blog/review-single'
    //   },
  
    //   redirect: {
    //     responseType: 'redirect',
    //     description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    //   },
  
    // },
  
  
//     fn: async function () {
//         //update isReviewed to true. need to changeto PUT request in future
//       const blogId = this.req.param("blogId")
//       if (this.req.method == "POST") {
//         try {
//           const blogRecord = await Blog.update({id: blogId}).set({isReviewed: true
//           }).fetch()

//         } catch(err) {
//           this.res.serverError(err.toString())
//         }
        
//       } 

//       try {
//         const blog = await Blog.findOne({id: blogId}).populate("writer")
//         const sanitizedBlog = JSON.parse(JSON.stringify(blog))
//         return {
//             blog: sanitizedBlog,
//             me: this.req.me,
//         };
//       } catch(err) {
//           this.res.serverError(err.toString())
//       }
      
//     }  
// };

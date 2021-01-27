module.exports = async function (req,res) {
  try {
    const blogs = await Blog.find({writer: req.session.userId})
    .sort('createdAt DESC')
    .populate('writer')
    const sanitizedBlogs = JSON.parse(JSON.stringify(blogs))

    const percentage = 50;

    //compute pctg of blogs here and pass it to homepage

    return res.view("pages/homepage", {
      blogs: sanitizedBlogs,
      pct: percentage,
    });
  } catch(err) {
    res.serverError(error.toString())
  }
};
  // friendlyName: 'View homepage',


  // description: 'Display homepage with writers blogs.',


  // exits: {

  //   success: {
  //     statusCode: 200,
  //     viewTemplatePath: 'pages/homepage'
  //   },

  // },


//   fn: async function () {
//     try {
//       const blogs = await Blog.find({writer: this.req.me.id})
//       .sort('createdAt DESC')
//       .populate('writer')
//       const sanitizedBlog = JSON.parse(JSON.stringify(blogs))
//       return {
//         blogs: sanitizedBlog,
//       };
//     } catch(err) {
//       this.res.serverError(error.toString())
//     }
//   }
// };

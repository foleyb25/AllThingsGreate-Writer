module.exports = async function(req,res) {
    var screenplay = JSON.parse(req.param('screenplay'));
    var rating = req.param('rating');
    var blog_url = req.param('blog_url');
    var screenplay_type = req.param('screenplay_type')
    var persisted_screenplay
    var persisted_review
    var persisted_service
    var is_submitted = false
    var is_10_and_blog_blank = false
    var need_www = false
    var invalid_url = false
    const axios = require("axios");

    //CHECK URL VALIDITY
    try {
      if (blog_url != '') {
          if(blog_url.search('www') == -1) {
            need_www = true
            return res.send({
              is_submitted: is_submitted,
              is_10_and_blog_blank: is_10_and_blog_blank,
              need_www: need_www,
              invalid_url: invalid_url,
              });
          }

          const has_atg_domain = blog_url.toLowerCase().includes("allthingsgreat".toLowerCase())
          if(!has_atg_domain) {
            invalid_url = true
            return res.send({
              is_submitted: is_submitted,
              is_10_and_blog_blank: is_10_and_blog_blank,
              need_www: need_www,
              invalid_url: invalid_url,
            });
          }
          const protocol = blog_url.substring(0, blog_url.indexOf('w'))
          const formatted_url = blog_url.replace(protocol, '')
          const options = {
              headers: {
                  'Access-Control-Allow-Origin' : '*',
              }
          };
          const is_valid_url = await axios.get("https://"+formatted_url, options).then(async function(response){
              console.log("response")
              return (response.status > 199 && response.status < 300)
          }).catch( async function(error) {
              console.log("Invalid Url")
              return false
          })
          if(!is_valid_url) {
            invalid_url = true
            return res.send({
              is_submitted: is_submitted,
              is_10_and_blog_blank: is_10_and_blog_blank,
              need_www: need_www,
              invalid_url: invalid_url,
            });
          }
      } else {
          //blog url is blank check to see if rating is 10
          if(rating == 10) {
              //blog url is blank and value is 10. notify blog is needed
            is_10_and_blog_blank = true
            return res.send({
              is_submitted: is_submitted,
              is_10_and_blog_blank: is_10_and_blog_blank,
              need_www: need_www,
              invalid_url: invalid_url,
            });
          } 
      }
  } catch(error) {
      console.error(error.toString())
  }
  //END CHECK URL VALIDITY



    //1) persist screenplay
      try {
        if (screenplay_type=='movie') {
          persisted_screenplay = await sails.helpers.persistmovie(screenplay);
        } else if (screenplay_type=='tv') {
          persisted_screenplay = await sails.helpers.persisttvshow(screenplay);
        } else {
          console.log("unknown film_type")
        }
    //2) persist review
    persisted_review = await sails.helpers.persistscreenplayreview(persisted_screenplay.id, req.me.id, rating, blog_url);

    //3) persist watchService(s)
    // persisted_service = await sails.helpers.flixed.getflixedmoviedetails("flixed")





        is_submitted = true
        return res.send({
          is_submitted: is_submitted,
          is_10_and_blog_blank: is_10_and_blog_blank,
          need_www: need_www,
          invalid_url: invalid_url,
        });
    
        
      } catch(err) {
        res.serverError(err.toString())
      }
    };
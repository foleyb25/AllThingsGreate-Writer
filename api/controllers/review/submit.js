module.exports = async function(req,res) {
    var screenplay = JSON.parse(req.param('screenplay'));
    var rating = req.param('rating');
    var blog_url = req.param('blog_url');
    var screenplay_type = req.param('screenplay_type')
    var persisted_screenplay
    var persist_review_status
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
    persist_review_status = await sails.helpers.persistscreenplayreview(persisted_screenplay.id, req.me.id, rating, blog_url);

    //3) persist watchService(s)







        return res.send({
        //   film: film,
        //   type: film_type,
        });
    
        
      } catch(err) {
        res.serverError(err.toString())
      }
    };
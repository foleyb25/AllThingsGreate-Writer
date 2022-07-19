module.exports = async function(req,res) {
  var imdb_id = req.param('imdb_id');
  var reviewed = false

    try {
        var MDBA_screenplay = await sails.helpers.moviedatabasealternative.findbyimdbid(imdb_id);
        var DB_screenplay = await Screenplay.findOne({imdb_id: imdb_id}).populate("reviews", {
          where: {
            writer: req.me.id
          }
        })

      const review_data = !DB_screenplay ? undefined : DB_screenplay.reviews[0]
      if(DB_screenplay!=undefined && DB_screenplay.reviews.length > 0) {
        reviewed = true
      }
      return res.view("pages/review/review-screenplay-view", {
        screenplay: MDBA_screenplay,
        value: !review_data ? 5 : review_data.score,
        blog_url: !review_data ? '' : review_data.blog_url,
        reviewed: reviewed,
      });
  
      
    } catch(err) {
      res.serverError(err.toString())
    }
  };
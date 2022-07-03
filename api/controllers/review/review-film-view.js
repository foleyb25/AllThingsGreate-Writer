module.exports = async function(req,res) {
  var film_id = req.param('id');
  var film_type = req.param('filmtype')
  var film
  var screenplay
  var reviewed = false
    try {
      if (film_type=='movie') {
        film = await sails.helpers.searchmoviesingle(film_id);
        screenplay = await Screenplay.findOne({imdb_id: film.imdb_id}).populate("reviews", {
          where: {
            writer: req.me.id
          }
        })
      } else if (film_type=='tv') {
        film = await sails.helpers.searchtvshowsingle(film_id);
        screenplay = await Screenplay.findOne({media_type: 'series', title: film.name}).populate("reviews", {
          where: {
            writer: req.me.id
          }
        })
        
      } else {
        console.log("unknown film_type")
      }

      const review_data = !screenplay ? undefined : screenplay.reviews[0]
      if(screenplay!=undefined) {
        reviewed = true
      }
      return res.view("pages/review/review-film-view", {
        film: film,
        type: film_type,
        value: !review_data ? 5 : review_data.score,
        blog_url: !review_data ? '' : review_data.blog_url,
        reviewed: reviewed,
      });
  
      
    } catch(err) {
      res.serverError(err.toString())
    }
  };
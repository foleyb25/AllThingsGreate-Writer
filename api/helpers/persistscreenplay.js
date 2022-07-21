module.exports = {
    friendlyName: 'persist screenplay',
    description: 'save screenplay data to database',
  
    inputs: {
      MDBA_screenplay: {
        type: 'ref',
        description: 'screenplay with movie database alternative data to persist'
      },
    },
  
  
    exits: {
  
      success: {
        description: 'Success',
      },
  
      badUpload: {
        description: 'Persist call failed.'
      }
  
    },
  
  
    fn: async function (inputs, exits) {
        const axios = require("axios");
        //0) check to see if screenplay already exists in the databse using tmdb id, if it does, just update the IMDB score
        //1) get tmdb movie data. Call find by id then get movie or tv details
        //2) save to database using tmdb id as the id <Conditional step>
        var DB_screenplay = await Screenplay.findOne({imdb_id: inputs.MDBA_screenplay.imdbID})
        var imdb_score = ''
        var rotten_score = ''
        var metacritic_score = ''
        var screenplay_ratings = inputs.MDBA_screenplay.Ratings
        var found_tmdb_screenplay = await sails.helpers.tmdb.findbyimdbid(inputs.MDBA_screenplay.imdbID)
        var tmdb_screenplay_to_persist
        if(inputs.MDBA_screenplay.Type=='series') {
            tmdb_screenplay_to_persist = await sails.helpers.tmdb.gettvdetails(found_tmdb_screenplay.tv_results[0].id)
        } else if (inputs.MDBA_screenplay.Type == 'movie') {
            tmdb_screenplay_to_persist = await sails.helpers.tmdb.getmoviedetails(found_tmdb_screenplay.movie_results[0].id)
        } else {
            console.log("Could not identify screenplay type")
        }
        for(i in screenplay_ratings) {
            switch (screenplay_ratings[i].Source) {
                case 'Internet Movie Database':
                    imdb_score = screenplay_ratings[i].Value
                    break;
                case 'Rotten Tomatoes':
                    rotten_score = screenplay_ratings[i].Value
                    break;
                case 'Metacritic':
                    metacritic_score = screenplay_ratings[i].Value
                    break;
                default:
                    console.log("Score not found from IMDB RT or Metacrict")
            }
        }
        if (!DB_screenplay) {
            //create new record
            var result = !tmdb_screenplay_to_persist.number_of_seasons ? '': tmdb_screenplay_to_persist.number_of_seasons
            const screenplay_record = await Screenplay.create({
            tmdb_id: tmdb_screenplay_to_persist.id,
            imdb_id: inputs.MDBA_screenplay.imdbID,
            title: inputs.MDBA_screenplay.Title,
            overview: tmdb_screenplay_to_persist.overview,
            plot: inputs.MDBA_screenplay.Plot,
            media_type: inputs.MDBA_screenplay.Type,
            runtime: inputs.MDBA_screenplay.Runtime,
            revenue: tmdb_screenplay_to_persist.revenue,
            budget: tmdb_screenplay_to_persist.budget,
            box_office: inputs.MDBA_screenplay.BoxOffice,
            poster_path: 'https://image.tmdb.org/t/p/original'+tmdb_screenplay_to_persist.poster_path,
            backdrop_path: 'https://image.tmdb.org/t/p/original'+tmdb_screenplay_to_persist.backdrop_path,
            homepage_url: tmdb_screenplay_to_persist.homepage,
            tmdb_score: tmdb_screenplay_to_persist.vote_average,
            imdb_score: imdb_score,
            rotten_score: rotten_score,
            metacritic_score: metacritic_score,
            director: inputs.MDBA_screenplay.Director,
            rated: inputs.MDBA_screenplay.Rated,
            actors: inputs.MDBA_screenplay.Actors,
            awards: inputs.MDBA_screenplay.Awards,
            releasedate: inputs.MDBA_screenplay.Released,
            genre: inputs.MDBA_screenplay.Genre,
            writers: inputs.MDBA_screenplay.Writer,
            num_seasons: !tmdb_screenplay_to_persist.number_of_seasons ? 0: tmdb_screenplay_to_persist.number_of_seasons,
            }).fetch()
            return exits.success(screenplay_record)
        } else {
            //update record imdb, rotten tomatoes, metacritic score
            const updated_screenplay = await Screenplay.update({imdb_id: inputs.MDBA_screenplay.imdbID}).set({tmdb_score: tmdb_screenplay_to_persist.vote_average,
                    imdb_score: imdb_score, rotten_score: rotten_score, metacritic_score: metacritic_score }).fetch()
            return exits.success(DB_screenplay)
        }

        
        
        
    
      }
  };
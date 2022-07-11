module.exports = {
    friendlyName: 'persist movie',
    description: 'save movie data to database',
  
    inputs: {
      movie: {
        type: 'ref',
        description: 'movie to persist'
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
        //0) check to see if movie already exists in the databse using tmdb id, if it does, just update the IMDB score
        //1) get imdb data rating using imdb id
        //2) save to database using tmdb id as the id <Conditional step>
        var found_screenplay = await Screenplay.findOne({imdb_id: inputs.movie.imdb_id})
        const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {r: 'json', i: inputs.movie.imdb_id},
        headers: {
            'X-RapidAPI-Key': '0378cb559emsha92428365269fe8p1f4409jsnfb71711af35c',
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
        };
        const movie = inputs.movie
        axios.request(options).then( async function (response) {
            var imdb_score = ''
            var rotten_score = ''
            var metacritic_score = ''
            var screenplay_ratings = response.data.Ratings
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
            if (!found_screenplay) {
                //create new record
                const screenplay_record = await Screenplay.create({
                tmdb_id: inputs.movie.id,
                imdb_id: response.data.imdbID,
                title: inputs.movie.title,
                overview: inputs.movie.overview,
                plot: response.data.Plot,
                media_type: response.data.Type,
                runtime: inputs.movie.runtime,
                revenue: inputs.movie.revenue,
                budget: inputs.movie.budget,
                box_office: response.data.BoxOffice,
                poster_path: 'https://image.tmdb.org/t/p/original'+inputs.movie.poster_path,
                backdrop_path: 'https://image.tmdb.org/t/p/original'+inputs.movie.backdrop_path,
                homepage_url: inputs.movie.homepage,
                tmdb_score: inputs.movie.vote_average,
                imdb_score: imdb_score,
                rotten_score: rotten_score,
                metacritic_score: metacritic_score,
                rated: response.data.Rated,
                actors: response.data.Actors,
                awards: response.data.Awards,
                }).fetch()
                return exits.success(screenplay_record)
            } else {
                //update record imdb, rotten tomatoes, metacritic score
                await Screenplay.update({id: found_screenplay.id}).set({tmdb_score: inputs.movie.vote_average,
                     imdb_score: imdb_score, rotten_score: rotten_score, metacritic_score: metacritic_score })
                return exits.success(found_screenplay)
            }
        }).catch(function (error) {
            console.error(error);
        });

        
        
        
    
      }
  };
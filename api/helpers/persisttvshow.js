const getseriesimdbid = require("./getseriesimdbid");

module.exports = {
    friendlyName: 'persist tv show',
    description: 'save tv show data to database',
  
    inputs: {
      show: {
        type: 'ref',
        description: 'show to persist'
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
      //0) check to see if show already exists in the databse using tmdb id, if it does, just update the IMDB score
      //1) get imdb data rating using imdb id
      //2) save to database using tmdb id as the id <Conditional step>
    //   var found_screenplay = await Screenplay.findOne({imdb_id: inputs.show.imdb_id})
    
    var year = new Date(inputs.show.first_air_date).getFullYear()
    var imdb_id = await sails.helpers.getseriesimdbid(inputs.show.name, year)
    var found_screenplay = await Screenplay.findOne({imdb_id: imdb_id})
      const options = {
      method: 'GET',
      url: 'https://movie-database-alternative.p.rapidapi.com/',
      params: {r: 'json', i: imdb_id},
      headers: {
          'X-RapidAPI-Key': '0378cb559emsha92428365269fe8p1f4409jsnfb71711af35c',
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
      };
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
          tmdb_id: inputs.show.id,
          imdb_id: response.data.imdbID,
          title: inputs.show.name,
          overview: inputs.show.overview,
          plot: response.data.Plot,
          media_type: response.data.Type,
          num_seasons: inputs.show.number_of_seasons,
          runtime: response.data.Runtime,
          revenue: inputs.show.revenue,
          budget: inputs.show.budget,
          box_office: response.data.BoxOffice,
          poster_path: 'https://image.tmdb.org/t/p/original'+inputs.show.poster_path,
          backdrop_path: 'https://image.tmdb.org/t/p/original'+inputs.show.backdrop_path,
          homepage_url: inputs.show.homepage,
          tmdb_score: inputs.show.vote_average,
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
              await Screenplay.update({id: found_screenplay.id}).set({tmdb_score: inputs.show.vote_average,
                   imdb_score: imdb_score, rotten_score: rotten_score, metacritic_score: metacritic_score })
                   return exits.success(found_screenplay)
          }
      }).catch(function (error) {
          console.error(error);
      });
        
    
      }
  };
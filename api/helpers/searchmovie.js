module.exports = {
    friendlyName: 'searchmovie',
    description: 'Get page of 20 movies from tmdb api',
  
    inputs: {
      search_string: {
        type: 'ref',
        description: 'search query string of movie/tv show title'
      },

      page_num: {
        type: 'ref',
        description: 'Page number to render'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'Success',
      },
  
      badUpload: {
        description: 'API Persist call failed.'
      }
  
    },
  
  
    fn: async function (inputs, exits) {
        const axios = require("axios");
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/multi?api_key=47e95b6f1f16930b4bab4ac1677815c7&language=en-US&query=+'+inputs.search_string+'&page='+inputs.page_num+'&include_adult=false',
            headers: {

            }
          };
          
          axios.request(options).then(function (response) {
              return exits.success(response.data)
          }).catch(function (error) {
              console.error(error);
          });
        
    
      }
  };
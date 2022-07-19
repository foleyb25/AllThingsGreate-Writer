module.exports = {
    friendlyName: 'search single screenplay',
    description: 'Search tmdb database for single mvoie based on id',
  
    inputs: {
      imdb_id: {
        type: 'ref',
        description: 'id of movie'
      },

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
            url: 'https://api.themoviedb.org/3/find/'+inputs.imdb_id+'?api_key=47e95b6f1f16930b4bab4ac1677815c7&language=en-US&external_source=imdb_id',
            headers: {

            }
          };
          
          await axios.request(options).then(function (response) {
              return exits.success(response.data)
          }).catch(function (error) {
              console.error(error);
          });
        
    
      }
  };

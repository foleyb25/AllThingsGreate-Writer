module.exports = {
    friendlyName: 'search single movie',
    description: 'Search tmdb database for single mvoie based on id',
  
    inputs: {
      tmdb_id: {
        type: 'ref',
        description: 'tmdb_id of screenplay'
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
            url: 'https://api.themoviedb.org/3/movie/'+inputs.tmdb_id+'/watch/providers?api_key=47e95b6f1f16930b4bab4ac1677815c7',
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
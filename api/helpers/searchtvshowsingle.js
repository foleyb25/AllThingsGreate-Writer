module.exports = {
    friendlyName: 'search single tv show',
    description: 'Search tmdb database for single tv show based on id',
  
    inputs: {
      show_id: {
        type: 'ref',
        description: 'id of tv show'
      },

    },
  
  
    exits: {
  
      success: {
        description: 'Success',
      },
  
      badUpload: {
        description: 'API call failed.'
      }
  
    },
  
  
    fn: async function (inputs, exits) {
        const axios = require("axios");
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/tv/'+inputs.show_id+'?api_key=47e95b6f1f16930b4bab4ac1677815c7&language=en-US',
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
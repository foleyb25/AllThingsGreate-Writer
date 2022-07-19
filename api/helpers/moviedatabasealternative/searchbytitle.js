module.exports = {
    friendlyName: 'search for screenplays based on string',
    description: 'get list of screenplays matching title string',
  
    inputs: {
      title: {
        type: 'ref',
        description: 'show to persist'
      },

        page: {
            type: 'ref',
            this: "page to search"
        }

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
    const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {s: inputs.title, r: 'json', page: inputs.page},
        headers: {
          'X-RapidAPI-Key': '0378cb559emsha92428365269fe8p1f4409jsnfb71711af35c',
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
      };
      
      await axios.request(options).then( async function (response) {
          return exits.success(response.data.Search)
          
      }).catch(function (error) {
          console.error(error);
      });
        
    
      }
  };
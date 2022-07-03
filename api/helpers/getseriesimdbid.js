module.exports = {
    friendlyName: 'retrieve imdb id',
    description: 'get imdb id based on title and release year',
  
    inputs: {
      title: {
        type: 'ref',
        description: 'show to persist'
      },

      release_year: {
        type: 'ref',
        description: 'year series was released'
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
      params: {s: inputs.title, r: 'json', type: 'series', y: inputs.year, page: '1'},
      headers: {
          'X-RapidAPI-Key': '0378cb559emsha92428365269fe8p1f4409jsnfb71711af35c',
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
      };
      
      axios.request(options).then( async function (response) {
          console.log(response.data.Search[0]);
          const show = response.data.Search[0]
          return exits.success(response.data.Search[0].imdbID)
          
      }).catch(function (error) {
          console.error(error);
      });
        
    
      }
  };
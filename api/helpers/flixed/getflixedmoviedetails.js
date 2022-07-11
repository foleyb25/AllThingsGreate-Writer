module.exports = {
    friendlyName: 'persist watch service data',
    description: 'save watch service data to database',
  
    inputs: {
      watchservice: {
        type: 'ref',
        description: 'watch service to persist'
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
        //1) call Flixed API getMovie endpoint using imdb id with string pruned
        //2) get array of each service associated with screenplay
        //3) iterate over array and call get service API endpoint for each streaming service and persist to database
        const axios = require("axios");
        const options = {
            method: 'GET',
            url: 'https://api.flixed.io/v1/movies/tt4574334?idType=imdb&apiKey=y88GmHugzWdqoWakUtpfA7OXUziOBYg8',
            headers: {
              "Accept": "application/json"
            }
          };
          
          axios.request(options).then(function (response) {
              return exits.success(response.data)
          }).catch(function (error) {
              console.error(error);
          });
        
    
      }
  };
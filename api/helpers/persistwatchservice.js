module.exports = {
    friendlyName: 'persist watch service data',
    description: 'save watch service data to database',
  
    inputs: {
      screenplay: {
        type: 'ref',
        description: 'screenplay object'
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
        var _ = require("underscore")
        var provider_ids = []
        var DB_provider_ids = []
        var provider_ids_to_delete = []
        //1) call Flixed API getMovie endpoint using imdb id with string pruned
        //2) get array of each service associated with screenplay
        //3) iterate over array and call get service API endpoint for each streaming service and persist to database
        // const movie_details = await sails.helpers.flixed.getflixedmoviedetails(inputs.screenplay)
        var watchServiceList
        if(inputs.screenplay.media_type == "series") {
          watchServiceList = await sails.helpers.tmdb.gettvwatchproviders(inputs.screenplay.tmdb_id)
        } else if (inputs.screenplay.media_type == "movie") {
          watchServiceList = await sails.helpers.tmdb.getmoviewatchproviders(inputs.screenplay.tmdb_id)
        } else {

        }
        //delete from the DB, we're going to start a clean slate
        const destroy_result = await Watchservice.destroy({screenplay: inputs.screenplay.id})
        if(Object.keys(watchServiceList.results).length != 0) {
          const streamingList = watchServiceList.results.US.flatrate
          for(var i in streamingList) {
            const Watchservice_result = await Watchservice.create({
              tmdb_provider_id: streamingList[i].provider_id,
              name: streamingList[i].provider_name,
              logo_url: 'https://image.tmdb.org/t/p/original'+streamingList[i].logo_path,
              screenplay: inputs.screenplay.id,
            })
          }
          
        } else {
          console.log("No Watch Services found for: "+inputs.screenplay.title)
        }
        
        return exits.success(watchServiceList.results.US)
    
      }
  };
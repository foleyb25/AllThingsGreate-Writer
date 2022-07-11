module.exports = {
    friendlyName: 'persist movie or tv show review',
    description: 'save movie or tv show review data to database',
  
    inputs: {
      screenplay_id: {
        type: 'ref',
        description: 'id of show or movie to persist'
      },

      writer_id: {
        type: 'ref',
        description: 'id of the writer submitting the review',
      },

      rating: {
        type: 'ref',
        description: "rating submitted by writer"
      },

      blog_url: {
        type: 'ref',
        description: "reference blog url submitted by writer. Can be empty string"
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

      try {
        var review_record = await Screenplayreview.find({screenplay: inputs.screenplay_id}).populate("writer")
        //1) Just save this one to the database, no API calls necessary
        var already_reviewed = false 
        for(var i in review_record) {
          if(review_record[i].writer.id == inputs.writer_id) {
            already_reviewed = true;
            break;
          }
        }
      if(!already_reviewed) {
        const screenplay_review_record = await Screenplayreview.create({
          writer: inputs.writer_id,
          screenplay: inputs.screenplay_id,
          score: inputs.rating,
          blog_url: inputs.blog_url,
        }).fetch();
        return exits.success(screenplay_review_record)
      } else {
        console.log("A review has already been made for this screenplay, updating record...")
        const screenplay_review_record = await Screenplayreview.update({id: inputs.id}).set({
          score: Number(inputs.rating),
          blog_url: inputs.blog_url,
        }).fetch();
            
        return exits.success(screenplay_review_record)

      }

      } catch (error) {
        console.error("An error occured when trying to save Screenplayreview to DB:" +error)
        return "failed"
      }
      }
  };
module.exports = {
    friendlyName: 'persist screenplay review',
    description: 'save screenplay review data to database',
  
    inputs: {
      screenplay_id: {
        type: 'ref',
        description: 'id of show or screenplay to persist'
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
        var review_record = await Screenplayreview.findOne({screenplay: inputs.screenplay_id, writer: inputs.writer_id}).populate("writer")
        //1) Just save this one to the database, no API calls necessary

      if(!review_record) {
        const screenplay_review_record = await Screenplayreview.create({
          writer: inputs.writer_id,
          screenplay: inputs.screenplay_id,
          score: inputs.rating,
          blog_url: !inputs.blog_url ? '' : 'https://'+inputs.blog_url,
        }).fetch();
        return exits.success(screenplay_review_record)
      } else {
        console.log("A review has already been made for this screenplay, updating record...")
        const screenplay_review_record = await Screenplayreview.update({id: review_record.id}).set({
          score: Number(inputs.rating),
          blog_url: !inputs.blog_url ? '' : 'https://'+inputs.blog_url,
        }).fetch();
            
        return exits.success(screenplay_review_record)

      }

      } catch (error) {
        console.error("An error occured when trying to save Screenplayreview to DB:" +error)
        return "failed"
      }
      }
  };
module.exports = {

    customToJSON: function() {
        const fromNow = sails.moment(this.updatedAt).fromNow()
        return {id: this.id, rating: this.rating,
            isReviewed: this.isReviewed,
            title: this.title,
            bodyHTML: this.bodyHTML,
            imageUrl: this.imageUrl,
            writer: this.writer,
            category: this.category,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            previewText: this.previewText,
            numComments: this.numComments,
            numberOfRatings: this.numberOfRatings,
            isArchived: this.isArchived,
            fromNow: fromNow,
          }
    },

    attributes: {
        numComments: {
            type: 'number', defaultsTo: 0
        },

        rating: {
            type: 'number', defaultsTo: 0
        },

        isReviewed: {
            type: 'boolean', defaultsTo: false
        },

        numberOfRatings: {
            type: 'number', defaultsTo:0
        },

        isArchived: {
            type: 'boolean', defaultsTo:false
        },

        title: {
            type: 'string', required: true
        },

        bodyHTML: {
            type: 'string', required: true
        },

        imageUrl: {
            type: 'string',
            required: true,
        },

        writer: {
            model: 'writer'
        },

        category: {
            type: 'string',
            defaultsTo: "AllThingsGreat",
        },
        
        previewText: {
            type: 'string',
            defaultsTo: '',
        },
    }
}
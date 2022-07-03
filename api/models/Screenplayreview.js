module.exports = {

    customToJSON: function() {
        return {id: this.id,
            score: this.score,
            blog_url: this.blog_url,
          }
    },

    attributes: {
       writer: {
            model: 'writer',
       },

       screenplay: {
            model: 'screenplay',
       },

       score: {
            type: 'number'
       },

       blog_url: {
            type: 'string'
       }
    }
}
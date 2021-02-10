module.exports = {

    customToJSON: function() {
        const fromNow = sails.moment(this.createdAt).fromNow()
        return {id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            fromNow: fromNow,
            blog: this.blog,
            user: this.user,
            reply: this.reply,
            text: this.text,
            upVotes: this.upVotes,
            downVotes: this.downVotes,
          }
    },

    attributes: {
        text: {
            type: 'string', required: true
        },

        blog: {
            model: 'blog', required: true,
        },

        user: {
            model: 'user', required: true,
        },

        reply: {
            model: 'comment'
        },

        upVotes: {
            type: 'number', defaultsTo: 0,
        },

        downVotes: {
            type: 'number', defaultsTo: 0,
        }
    }
}
module.exports = {

    customToJSON: function() {
        return {id: this.id,
            name: this.name,
            watch_url: this.watch_url,
            monetizationType: this.monetizationType,
            price: this.price,
            logo_url: this.logo_url,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
          }
    },

    attributes: {
        name: {
            type: 'string'
        },

        watch_url: {
            type: 'string'
        },

        monetizationType: {
            type: 'string'
        },

        price: {
            type: 'number'
        },

        logo_url: {
            type: 'string'
        },

        owner: {
            model: 'screenplay'
        }
    }
}
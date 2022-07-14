module.exports = {

    customToJSON: function() {
        return {tmdb_id: this.tmdb_id,
            imdb_id: this.imdb_id,
            title: this.title,
            overview: this.overview,
            media_type: this.media_type,
            runtime: this.runtime,
            revenue: this.revenue,
            budget: this.budget,
            box_office: this.box_office,
            poster_path: this.poster_path,
            backdrop_path: this.backdrop_path,
            homepage_url: this.homepage_url,
            tmdb_score: this.tmdb_score,
            imdb_score: this.imdb_score,
            rotten_score: this.rotten_score,
            metacritic_score: this.metacritic_score,
            rated: this.rated,
            plot: this.plot,
            actors: this.actors,
            awards: this.awards,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            releasedate: this.releasedate,
            genre: this.genre,
            director: this.director,
            writers: this.writers,
            actors: this.actors,
            awards: this.awards,
            num_seasons: this.num_seasons

          }
    },

    attributes: {
        reviews: {
            collection: 'screenplayreview',
            via: 'screenplay',
        },

        services: {
            collection: 'watchservice',
            via: 'screenplay',
        },

        tmdb_id: {
            type: 'number'
        },

        imdb_id: {
            type: 'string'
        },

        title: {
            type: 'string'
        },

        overview: {
            type: 'string'
        },

        media_type: {
            type: 'string'
        },

        num_seasons: {
            type: 'string'
        },

        runtime: {
            type: 'string'
        },

        revenue: {
            type: 'number'
        },

        box_office: {
            type: 'string'
        },

        budget: {
            type: 'number'
        },

        poster_path: {
            type: 'string'
        },

        backdrop_path: {
            type: 'string'
        },

        homepage_url: {
            type: 'string'
        },

        tmdb_score: {
            type: 'number'
        },

        imdb_score: {
            type: 'string'
        },

        rotten_score: {
            type: 'string'
        },

        metacritic_score: {
            type: 'string'
        },

        rated: {
            type: 'string'
        },

        plot: {
            type: 'string'
        },

        actors: {
            type: 'string'
        },

        awards: {
            type: 'string'
        },

        releasedate: {
            type: 'string'
        },

        genre: {
            type: 'string'
        },

        director: {
            type: 'string'
        },

        writers: {
            type: 'string'
        },

        actors: {
            type: 'string'
        },

        awards: {
            type: 'string'
        }

    }
}
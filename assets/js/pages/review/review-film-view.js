parasails.registerPage('review-film-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      film: window.SAILS_LOCALS.film,
      type: window.SAILS_LOCALS.type,
      reviewed: window.SAILS_LOCALS.reviewed,
      value: !window.SAILS_LOCALS.value ? window.SAILS_LOCALS.value : 5,
      blog_url: window.SAILS_LOCALS.blog_url,
      
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
    },
    mounted: async function(){
  
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {

        clearContents: async function() {
            $('#movieList div').empty();
            this.pageNum = 0;
          },

        submitReview: async function()  {
            const formData = new FormData()
            formData.append('screenplay', JSON.stringify(this.film))
            formData.append('rating', this.value)
            formData.append('blog_url', this.blog_url)
            formData.append('screenplay_type', this.type)
            try {
                await axios.put('/review/submit', formData)
            } catch (err) {
                console.error(err.toString())
            }
        },
    },
    computed: {
        total: function () {
            return this.value
        },

        url_value: function () {
            return this.blog_url
        }

    }
  });
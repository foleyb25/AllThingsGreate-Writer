parasails.registerPage('review-screenplay-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      screenplay: window.SAILS_LOCALS.screenplay,
      reviewed: window.SAILS_LOCALS.reviewed,
      value: !window.SAILS_LOCALS.value ? window.SAILS_LOCALS.value : 5,
      blog_url: window.SAILS_LOCALS.blog_url,
      is_submitted: false,
      is_10_and_blog_blank: false,
      need_www: false,
      invalid_url: false,
      loading: false,
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
            $('#screenplayList div').empty();
            this.pageNum = 0;
          },

        submitReview: async function()  {
            const formData = new FormData()
            formData.append('screenplay', JSON.stringify(this.screenplay))
            formData.append('rating', this.value)
            formData.append('blog_url', this.blog_url)
            try {
                this.loading = true
                const result = await axios.put('/review/submit', formData)
                this.loading = false
                this.is_submitted = result.data.is_submitted
                this.is_10_and_blog_blank = result.data.is_10_and_blog_blank
                this.need_www = result.data.need_www
                this.invalid_url = result.data.invalid_url
            } catch (err) {
                this.loading = false
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
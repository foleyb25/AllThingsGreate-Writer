parasails.registerPage('create-blog-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      loading: false,
      disabled: true,
      bodyText: '',
      category: '',
      titleText: '',
      imageFile: undefined,
      pickedFileSrc: '',
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

        handleFileChange: async function(event) {
            const file = event.target.files[0];
            this.pickedFileSrc = file.name;
            
            const extension = filename.split('.').pop()
            if (extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'png' || extension.toLowerCase() == 'gif' || extension.toLowerCase() == 'jpeg') {
                document.getElementById('create-btn').disabled = false
                document.getElementById('notify-box').innerHTML = ''
                const imageSrc = window.URL.createObjectURL(file)
                document.getElementById("selectedImage").src = imageSrc
                return true
            } else {
                document.getElementById('create-btn').disabled = true
                document.getElementById('notify-box').innerHTML = "<p style='color:red;'>Please select .jpeg, .jpg, .gif, .png extension</p>"
                return false
            }  
    
        },

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
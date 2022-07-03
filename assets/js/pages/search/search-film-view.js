parasails.registerPage('search-film-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      movieList: window.SAILS_LOCALS.movieList,
      moreMovies: window.SAILS_LOCALS_moreMovies,
      pageNum: 0,
      isMore: window.SAILS_LOCALS.isMore,
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
  
    search: async function() {
      const searchString = document.querySelector("input[name=search]").value
      const formData = new FormData()
      const nextPage = this.pageNum + 1
      
      formData.append('searchString', searchString)
      formData.append('pageNum', nextPage)
      try {
        const res = await axios.put('/search/film/query', formData)
        this.moreMovies = res.data.moreMovies
        if (this.movieList!=undefined) {
          this.movieList.push.apply(this.movieList, res.data.moreMovies)
        } else {
          this.movieList = res.data.movieList
          for(movie in this.movieList) {
            console.log(movie.title)
          }
        }
        console.log(typeof(this.movieList))
        this.pageNum = nextPage
        this.isMore = res.data.isMore
        
    } catch (err) {
        console.error(err.toString())
    }
    }
    }
  });
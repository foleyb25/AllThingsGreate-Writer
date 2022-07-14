parasails.registerPage('search-screenplay-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      screenplayList: window.SAILS_LOCALS.screenplayList,
      morescreenplays: window.SAILS_LOCALS_morescreenplays,
      pageNum: 0,
      isMore: window.SAILS_LOCALS.isMore,
      noResults: window.SAILS_LOCALS.noResults,
      loading: false
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
      $('.screenplay-list div').empty();
      this.pageNum = 0;
      this.isMore = false;
    },
  
    search: async function() {
      const searchString = document.querySelector("input[name=search]").value
      const formData = new FormData()
      const nextPage = this.pageNum + 1
      
      formData.append('searchString', searchString)
      formData.append('pageNum', nextPage)
      try {
        this.loading = true
        const res = await axios.put('/search/screenplay/query', formData)
        this.loading = false
        this.morescreenplays = res.data.morescreenplays
        if (this.screenplayList!=undefined) {
          this.screenplayList.push.apply(this.screenplayList, res.data.morescreenplays)
        } else {
          this.screenplayList = res.data.screenplayList
        }
        this.pageNum = nextPage
        this.isMore = res.data.isMore
        this.noResults = res.data.noResults
        
    } catch (err) {
        this.loading = false
        console.error(err.toString())
    }
    }
    }
  });
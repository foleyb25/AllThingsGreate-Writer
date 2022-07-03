module.exports = async function (req,res) {
   var searchString = req.param('searchString');
   var pageNum = req.param('pageNum')
   searchString = searchString.replace(' ', '%20')
   //TODO: Replace spaces in search string


   try {
     movieList = await sails.helpers.searchmovie(searchString, pageNum);
     var isMoreMovies = true;
     isMoreMovies = (movieList.results.length == 20)
     return res.send({
       movieList: movieList.results,
       pageNum: pageNum,
       moreMovies: movieList.results,
       isMore: isMoreMovies,
     });
   } catch(err) {
     res.serverError(err.toString())
   }
 };
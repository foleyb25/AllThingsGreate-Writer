module.exports = async function (req,res) {
   var searchString = req.param('searchString');
   var pageNum = req.param('pageNum')
   var isMorescreenplays = true;
   var noResults = false;
   //TODO: Replace spaces in search string


   try {
    var screenplayList = await sails.helpers.moviedatabasealternative.searchbytitle(searchString, pageNum)
    if (!screenplayList) {
      noResults = true
      isMorescreenplays = false
    } else {
      isMorescreenplays = (screenplayList.length == 10)
    }
     
     return res.send({
       screenplayList: screenplayList,
       pageNum: pageNum,
       morescreenplays: screenplayList,
       isMore: isMorescreenplays,
       noResults: noResults
     });
   } catch(err) {
     res.serverError(err.toString())
   }
 };
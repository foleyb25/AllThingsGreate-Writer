module.exports = async function(req, res) {

    const currentWriter = await Writer.findOne({id: req.session.userId})
    
    // customToJSON
    const sanitizedWriter = JSON.parse(JSON.stringify(currentWriter))

    res.view('pages/user/profile', {
        writer: sanitizedWriter
    })
}
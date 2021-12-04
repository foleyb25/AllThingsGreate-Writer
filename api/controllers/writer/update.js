module.exports = async function(req, res) {
    console.log("Trying to update user")

    const fullName = req.body.fullName
    const bio = req.body.bio
    const nickName = req.body.nickName
    const instagramLink = req.body.instagramLink
    const snapchatLink = req.body.snapchatLink
    const twitterLink = req.body.twitterLink
    const tiktokLink = req.body.tiktokLink
    const file = req.file('imagefile')

    // no profilePic file change was found
    if (file.isNoop) {
        await Writer.update({id: req.session.userId})
            .set({fullName: fullName, nickName: nickName, bio: bio, 
                instagramLink:instagramLink, snapchatLink:snapchatLink,
            twitterLink:twitterLink, tiktokLink:tiktokLink})
        file.upload({noop: true})
        return res.end()
    }

    try {
        const fileUrl = await sails.helpers.uploadfile(file)
        const userId = req.session.userId
        const record = await Writer.update({id: userId})
            .set({fullName: fullName, nickName: nickName, bio: bio, 
                instagramLink:instagramLink, snapchatLink:snapchatLink,
            twitterLink:twitterLink, tiktokLink:tiktokLink,
                profileImageUrl: fileUrl}).fetch()
    
        console.log(JSON.parse(JSON.stringify(record)))
        res.end()
    } catch (err) {
        res.serverError(err.toString())
    }
    
}
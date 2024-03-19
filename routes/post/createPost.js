const Community = require("../../models/Community");
const Posts= require("../../models/Post")
async function createPost(req, res) {
    try {
        const { id, role } = req.user;
        const {comm_id} = req.body;
        const community = await Community.findOne({_id: comm_id});
        //anyone can create post if part of community
        if (community.isArchived) {
            return res.status(403).json({ 
                error: 1,
                message: "Community does not exist" 
            })
        }
        //performing post creation compatability checks 
        if (!community.moderators.map(String).includes(id.toString()) && !community.participants.map(String).includes(id.toString()) && role != 'SUPERADMIN'){
            return res.status(403).json({ 
                error: 1,
                message: "Must join community to post" 
            })   
        }
        const post = await Posts.create({ ...req.body, 
            createdBy: id,
            repostedBy: [id]
        });
        // create an entry into our pg db as well
        return res.status(201).json({ 
            error: 0,
            message: "Created Post Successfully" 
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 1, 
            message: "Internal Server Error"
        })
    }
};

module.exports = createPost;
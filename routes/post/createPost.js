const Community = require("../../models/Community");
const Posts= require("../../models/Post")
const {PostCounter} = require('../../models/sqlModel')
const { client: esClient, getEmbeddingsUsingBERT } = require("../../utils/helpers");
async function createPost(req, res) {
    try {
        const { id, role } = req.user;
        const {comm_id} = req.body;
        const community = await Community.findOne({_id: comm_id});
        //anyone can create post if part of community or community not archived
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
            community: comm_id,
            createdBy: id,
        });

        // create vector embedding for the post
        const embedding = await getEmbeddingsUsingBERT(req.app.locals.model, post.title + ' ' + post.description);
        console.log("POST => ", post)
        console.log("EMBEDDING => ", embedding)
        // add the document to elastic search
        await esClient.index({
            index: "posts",
            id: post._id.toString(),
            body: {
                title: post.title,
                description: post.description,
                community: post.community.toString(),
                createdBy: post.createdBy.toString(),
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                vector: embedding
            },
        });


        // create a counter entry into our pg db as well
        PostCounter.create({ //no need to await this
            postId: post._id.toString(),
            likes: 0,
            dislikes: 0,
            comments: 0
        });
        return res.status(201).json({ 
            error: 0,
            message: "Created Post Successfully",
            post 
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
const {CommentCounter, CommentImpression} = require('../../models/sqlModel');

async function getCommentImpressions(req, res) {
    const {id: commentId} = req.params;
    const {offset = 0, limit = 10} = req.query;

    const commentImpressions = await CommentImpression.findAndCountAll({
        where: {
            commentId,
        },
        limit,
        offset: offset * limit,
    });

    // total likes and dislikes
    const commentCounter = await CommentCounter.findOne({
        where: {commentId},
    });


    return res.status(200).json({
        error: 0,
        message: "Comment Impressions Found",
        pagination: {
            page: offset,
            records_per_page: limit,
            total_records: commentImpressions.count,
            total_pages: Math.ceil(commentImpressions.count / limit)
        },
        totalLikes: commentCounter.likes,
        totalDislikes: commentCounter.dislikes,
        commentImpressions,
    });
}

module.exports = getCommentImpressions;

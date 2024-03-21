const { PostCounter, PostImpression } = require("../../models/sqlModel");

async function getPostImpressions(req, res) {
  const { id: postId } = req.params;

  const { page = 0, limit = 10 } = req.query;

  const postImpressions = await PostImpression.findAndCountAll({
    where: {
      postId,
    },
    limit,
    offset: page * limit,
  });

  // total likes and dislikes
  const postCounter = await PostCounter.findOne({
    where: { postId },
  });

  return res.status(200).json({
    error: 0,
    message: "Post Impressions Found",
    pagination: {
      page,
      records_per_page: limit,
      total_records: postImpressions.count,
      total_pages: Math.ceil(postImpressions.count / limit),
    },
    totalLikes: postCounter.likes,
    totalDislikes: postCounter.dislikes,
    postImpressions,
  });
}

module.exports = getPostImpressions;

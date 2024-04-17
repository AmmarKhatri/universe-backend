const { client: esClient, getEmbeddingsUsingBERT } = require("../../utils/helpers");

const fs = require("fs");

async function getSimilarPosts(req, res) {
  try {
    const post_title = req.query.title;
    const post_description = req.query.description;

    console.log(req.app.locals)
    const query_vector = await getEmbeddingsUsingBERT(
        req.app.locals.model,
      post_title + " " + post_description
    );

    console.log(query_vector);

    // write to a file
    fs.writeFileSync("./tmp/query_vector.txt", `[${query_vector.join(",")}]`);
    // Fetch similar posts from elastic search
    const result = await esClient.search({
      index: "posts",
      size: 1,
      query: {
        script_score: {
          query: { match_all: {} },
          script: {
            source: "cosineSimilarity(params.query_vector, 'vector') + 1.0",
            params: { query_vector: query_vector },
          },
        },
      },
    });

    console.log(result.hits.hits);

    // Return success message
    return res.status(200).json({
      error: 0,
      message: "Post fetched successfully",
      posts: result.hits.hits,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
}

module.exports = getSimilarPosts;

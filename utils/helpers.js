require("@tensorflow/tfjs");
const fs = require("fs");
const use = require("@tensorflow-models/universal-sentence-encoder");
// const caCertificate = Buffer.from(fs.readFileSync("/tmp/ca.crt"), "base64").toString();

async function getEmbeddingsUsingBERT(model, text) {
  // const model = await use.load();
  const sentences = [text];
  
  const embeddings = await model.embed(sentences);
  return embeddings.arraySync()[0];
}

const ElasticsearchClient = require("@elastic/elasticsearch");

const client = new ElasticsearchClient.Client({
  node: "https://es01:9200",
  auth: {
    username: 'elastic',
    password: 'secretpass'
  },
  tls: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./tmp/ca.crt")
  }
});

module.exports = {
  getEmbeddingsUsingBERT,
  client,
};

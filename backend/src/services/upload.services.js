import { client, collectionName } from "../config/qdrant.config.js";
async function uploadVector(data) {
  await client.upsert(collectionName, {
    wait: true,
    points: [
      {
        id: data.mongodbId,
        vector: {
          text: `${data.title},${data.description}, ${data.language}`,
          model: "sentence-transformers/all-MiniLM-L6-v2",
        },
        payload: {
          mongodbId: data.mongodbId,
          userId: data.userId,
          title: data.title,
          description: data.description,
          language: data.language,
        },
      },
    ],
  });
}
export default uploadVector;

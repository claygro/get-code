import { client, collectionName } from "../config/qdrant.config.js";
import { v4 as uuidv4 } from "uuid";
async function uploadVector(data) {
  console.log(data);
  try {
    await client.upsert(collectionName, {
      wait: true,
      points: [
        {
          id: uuidv4(),
          vector: {
            text: `${data.title} ${data.description} ${data.language}`,
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
  } catch (error) {
    console.error("Status:", error.status);
    console.error("Status Text:", error.statusText);
    console.error("Data:", error.data);
    console.error(error);
    console.log(`Failed to upload in qdrant: ${error.message}`);
  }
}
export default uploadVector;

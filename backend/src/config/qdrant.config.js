import { QdrantClient } from "@qdrant/js-client-rest";
const client = new QdrantClient({
  url: "https://9f82ce56-0813-4670-bf24-c07ef0432404.us-central1-0.gcp.cloud.qdrant.io",
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6OTI1ODI0MDktMmUzNy00NzIzLTg5NzAtYjYzMDdkMDRkYTQ5In0.-kBCmJkcDJHyZee1w4VEzO4Jh0a9TegQ4Zs4MuyuFFc",
});
const collectionName = "upload";

const collections = await client.getCollections();

const exists = collections.collections.some((c) => c.name === collectionName);

if (!exists) {
  await client.createCollection(collectionName, {
    vectors: {
      size: 384,
      distance: "Cosine",
    },
  });

  console.log("✅ Collection created");
} else {
  console.log("✅ Collection already exists");
}

export { client, collectionName };

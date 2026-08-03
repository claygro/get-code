import authModel from "../models/auth.models.js";
import UploadModel from "../models/upload.models.js";
import uploadVector from "../services/upload.services.js";
import { client } from "../config/qdrant.config.js";
import { collectionName } from "../config/qdrant.config.js";
class SnippetsControllers {
  async upload(req, res) {
    const userId = req.user.id;
    const { title, code, description, language } = req.body;
    try {
      const snippet = await UploadModel.create({
        userId: userId,
        title,
        description,
        code,
        language,
      });
      await uploadVector({
        mongodbId: snippet._id.toString(),
        userId,
        title,
        language,
        description,
      });

      res.status(200).json({ message: "uploaded successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to upload the code: ${error.message}` });
    }
  }
  //read
  async read(req, res) {
    try {
      const data = await UploadModel.find().populate("userId");
      if (!data) {
        return res.status(404).json({ message: "No snippits found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(`Failed to show: ${error.message}`);
      res
        .status(500)
        .json({ message: `Failed to show data: ${error.message}` });
    }
  }
  //search
  async search(req, res) {
    const { query } = req.body;
    try {
      const data = await client.query(collectionName, {
        query: {
          text: query,
          model: "sentence-transformers/all-MiniLM-L6-v2",
        },
        with_payload: true,
        limit: 5,
      });
      // const result = data.points.filter(
      //   (point) => point.score > 0.75 || point.score > 0.7,
      // );
      // console.log(data.points);
      const result = data.points[0];
      res.status(200).json(result.payload);
    } catch (error) {
      res.status(500).json({ message: `Failed to search: ${error.message}` });
    }
  }
}
export default SnippetsControllers;

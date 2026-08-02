import UploadModel from "../models/upload.models.js";
import uploadVector from "../services/upload.services.js";

class SnipptsControllers {
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
      const data = await UploadModel.find();
      if (!data) {
        return res.status(404).json({ message: "No snippits found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(`Failed to show: ${error.message}`);
    }
  }
}
export default SnipptsControllers;

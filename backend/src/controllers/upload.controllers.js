import UploadModel from "../models/upload.models.js";
class UploadControllers {
  async upload(req, res) {
    const userId = req.user.id;
    const { title, code, description } = req.body;
    try {
    } catch (error) {
      resizeBy
        .status(500)
        .json({ message: `Failed to upload the code: ${error}}` });
    }
  }
}
export default UploadControllers;

class UploadControllers {
  async upload(req, res) {
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

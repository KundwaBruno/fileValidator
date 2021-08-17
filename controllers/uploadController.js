const multer = require("multer");
const client = require("../redisConfig");

const upload = (req, res) => {
  const storage = multer.diskStorage({
    destination: "./files",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    storage,
  }).single("file");

  upload(req, res, (err) => {
    if (err) {
      res.send("Error while uploading file");
    } else {
      client.set(`${req.file.filename}`, req.file.path);
      res.send("File uploaded successfull");
    }
  });
};

module.exports = upload;

const express = require("express");
const authenticate = require("../authenticate");
const upload = require("../controllers/uploadController");
const router = express.Router();

router.post("/", authenticate, upload);

module.exports = router;

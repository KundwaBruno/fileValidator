const express = require("express");
const authenticate = require("../authenticate");
const validate = require("../controllers/validateController");
const router = express.Router();

router.get("/:filename", authenticate, validate);

module.exports = router;

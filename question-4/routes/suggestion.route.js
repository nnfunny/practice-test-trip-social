const express = require("express");
const suggestionController = require("../controllers/suggestion.controller");

const router = express.Router();

router.route("/").get(suggestionController.get);

module.exports = router;

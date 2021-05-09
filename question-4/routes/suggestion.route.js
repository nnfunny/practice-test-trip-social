var express = require("express");
var suggestionController = require("../controllers/suggestion.controller");

var router = express.Router();

router.route("/").get(suggestionController.get);

module.exports = router;

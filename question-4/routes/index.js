var express = require("express");
var suggestionRoutes = require("./suggestion.route");

var router = express.Router();

router.use("/docs", express.static("docs"));

router.use("/suggestions", suggestionRoutes);

module.exports = router;

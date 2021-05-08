const express = require("express");
const suggestionRoutes = require("./suggestion.route");

const router = express.Router();

router.use("/docs", express.static("docs"));

router.use("/suggestions", suggestionRoutes);

module.exports = router;

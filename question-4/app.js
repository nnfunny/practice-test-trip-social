var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var routes = require("./routes");

app.listen(port, function () {
  console.log("App listening at http://localhost:" + port);
});

// Static
app.use(express.static("data"));

// API Endpoints
app.use(routes);

// NOT FOUND
app.use(function (req, res) {
  res.status(404).send("NOT FOUND");
});

module.exports = app

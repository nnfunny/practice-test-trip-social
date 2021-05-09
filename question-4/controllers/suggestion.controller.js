var suggestionUtil = require("../utils/suggestion.util"),
  extractLocations = suggestionUtil.extractLocations,
  calculateLocationScore = suggestionUtil.calculateLocationScore,
  calculateLocationScore2 = suggestionUtil.calculateLocationScore2,
  matchWithName = suggestionUtil.matchWithName,
  sortInDescendingOrder = suggestionUtil.sortInDescendingOrder;

var path = require("path");

/**
 * Get suggestions for large cities
 * @public
 */
exports.get = function (req, res) {
  var tsvFile = path.join(__dirname, "../data/cities_canada-usa.tsv");
  var locations = extractLocations(tsvFile);
  var suggestions = [];
  var query = req.query,
      q = query.q,
      latitude = query.latitude,
      longitude = query.longitude;
  latitude = latitude ? latitude : 0;
  longitude = longitude ? longitude : 0;

  locations.forEach(function (location) {
    var score1 = calculateLocationScore(location, latitude, longitude);
    var score2 = calculateLocationScore2(location, latitude, longitude);
    var score = (score1 + score2) / 2;
    score = +score.toFixed(1);
    var name = location.name;

    if (score !== 0.0 && matchWithName(q, name)) {
      location.score = score;
      suggestions.push(location);
    }
  });

  suggestions.sort(sortInDescendingOrder);
  res.json({
    suggestions: suggestions,
  });
};

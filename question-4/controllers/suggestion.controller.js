var suggestionUtil = require("../utils/suggestion.util"),
  extractLocations = suggestionUtil.extractLocations,
  chooseSuggestions = suggestionUtil.chooseSuggestions,
  sortInDescendingOrder = suggestionUtil.sortInDescendingOrder;
var httpStatus = require("http-status");
var path = require("path");
var suggestionValidation = require("../validations/suggestion.validation");

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
  var validQuery = suggestionValidation.validateQuery(q, latitude, longitude);

  if (!validQuery) {
    res.status(httpStatus.NOT_FOUND).json({ suggestions: suggestions });
    return;
  }

  latitude = latitude ? +latitude : 0;
  longitude = longitude ? +longitude : 0;

  // Process queries
  suggestions = chooseSuggestions(q, latitude, longitude, locations);

  if (suggestions.length === 0) {
    res.status(httpStatus.NOT_FOUND).json({ suggestions: suggestions });
    return;
  }

  suggestions.sort(sortInDescendingOrder);

  res.status(httpStatus.OK).json({
    suggestions: suggestions,
  });
};

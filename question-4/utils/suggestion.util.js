"use strict";

var fs = require("fs");

var constants = require("./constants"),
  MAX_DISTANCE = constants.MAX_DISTANCE;
/**
 * Haversine formula:
 *    a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 *    c = 2 ⋅ atan2( √a, √(1−a) )
 *    d = R ⋅ c
 * Reference: http://www.movable-type.co.uk/scripts/latlong.html
 */

function calculateDistanceFormLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Earth's Radius in Km

  var lat1InRad = convertToRad(lat1);
  var lat2InRad = convertToRad(lat2);
  var deltaLatInRad = convertToRad(lat2 - lat1);
  var deltaLonInRad = convertToRad(lon2 - lon1);
  var a =
    Math.sin(deltaLatInRad / 2) * Math.sin(deltaLatInRad / 2) +
    Math.cos(lat1InRad) * Math.cos(lat2InRad) *
    Math.sin(deltaLonInRad / 2) * Math.sin(deltaLonInRad / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function convertToRad(deg) {
  return deg * (Math.PI / 180);
}

function calculateLocationScore(location, lat, lon) {
  var distanceInKm = calculateDistanceFormLatLonInKm(
    location.latitude,
    location.longitude,
    lat,
    lon
  );
  var score = MAX_DISTANCE - distanceInKm;
  score = score > 0 ? Math.round(score) / MAX_DISTANCE : 0;
  score = +score.toFixed(1);
  return score;
}

function calculateLocationScore2(location, latitude, longitude) {
  var lat = Math.abs(location.latitude - latitude);

  var _long = Math.abs(location.longitude - longitude);

  var score = 10 - (lat + _long) / 2;
  score = score > 0 ? Math.round(score) / 10 : 0;
  return score;
}

function extractLocations(tsvFile) {
  var locations = [];

  try {
    var data = fs.readFileSync(tsvFile, "utf-8");
    var rows = data.split(/\n/g);
    rows.forEach(function (row) {
      var location = row.split(/\t/g);
      var city = location[1] ? location[1] : "";
      var admin1 = location[7] ? "".concat(location[10]) : "";
      var country = location[8] ? "".concat(location[8]) : "";
      country = country === "US" ? "USA" : "Canada";
      var name = "".concat(city, ", ").concat(admin1, ", ").concat(country);
      var latitude = +location[4];
      var longitude = +location[5];

      if (name && latitude && longitude) {
        location = {
          name: name,
          latitude: latitude,
          longitude: longitude,
        };
        locations.push(location);
      }
    });
  } catch (err) {
    console.error(err);
  }

  return locations;
}

function matchWithName(keyword, name) {
  var rgx = new RegExp(keyword, "gi");
  return rgx.test(name);
}

function sortInDescendingOrder(suggestion1, suggestion2) {
  return suggestion2.score - suggestion1.score;
}

module.exports = {
  calculateDistanceFormLatLonInKm: calculateDistanceFormLatLonInKm,
  calculateLocationScore: calculateLocationScore,
  calculateLocationScore2: calculateLocationScore2,
  extractLocations: extractLocations,
  matchWithName: matchWithName,
  sortInDescendingOrder: sortInDescendingOrder,
};

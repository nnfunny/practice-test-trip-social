const fs = require('fs');
const { MAX_DISTANCE } = require('./constants');

/**
 * Haversine formula: 	
 *    a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 *    c = 2 ⋅ atan2( √a, √(1−a) )
 *    d = R ⋅ c
 * Reference: http://www.movable-type.co.uk/scripts/latlong.html
 */
function calculateDistanceFormLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's Radius in Km
  const lat1InRad = convertToRad(lat1);
  const lat2InRad = convertToRad(lat2);
  const deltaLatInRad = convertToRad(lat2 - lat1);
  const deltaLonInRad = convertToRad(lon2 - lon1);
  
  const a = Math.sin(deltaLatInRad / 2) * Math.sin(deltaLatInRad / 2) +
            Math.cos(lat1InRad) * Math.cos(lat2InRad) *
            Math.sin(deltaLonInRad / 2) * Math.sin(deltaLonInRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;

  return d;
}

function convertToRad(deg) {
  return deg * (Math.PI / 180);
}

function calculateLocationScore(location, lat, lon) {
  const distanceInKm = calculateDistanceFormLatLonInKm(
    location.latitude,
    location.longitude,
    lat,
    lon,
  );
  let score = MAX_DISTANCE - distanceInKm;

  score = score > 0 ? Math.round(score) / MAX_DISTANCE : 0;
  score = +score.toFixed(1);

  return score;
}

function calculateLocationScore2(location, latitude, longitude) {
  const lat = Math.abs(location.latitude - latitude);
  const long = Math.abs(location.longitude - longitude);
  let score = 10 - (lat + long) / 2;
  score = score > 0 ? Math.round(score) / 10 : 0;
  return score;
}

function extractLocations(tsvFile) {
  let locations = []

  try {
    const data = fs.readFileSync(tsvFile, 'utf-8');

    let rows = data.split(/\n/g);
    rows.forEach(row => {
      let location = row.split(/\t/g);
      let city = location[1] ? location[1] : "";
      let admin1 = location[7] ? `${location[10]}` : "";
      let country = location[8] ? `${location[8]}` : "";
      country = country === "US" ? "USA" : "Canada";
      let name = `${city}, ${admin1}, ${country}`;
      let latitude = +location[4];
      let longitude = +location[5];


      if (name && latitude && longitude) {
        location = { name, latitude, longitude }
        locations.push(location);
      }
    });
  } catch (err) {
    console.error(err);
  }
  
  return locations;
}

function matchWithName(keyword, name) {
  let rgx = new RegExp(keyword, "gi");

  return rgx.test(name);
}

function sortInDescendingOrder(suggestion1, suggestion2) {
  return suggestion2.score - suggestion1.score;
}

module.exports = {
  calculateDistanceFormLatLonInKm,
  calculateLocationScore,
  calculateLocationScore2,
  extractLocations,
  matchWithName,
  sortInDescendingOrder,
};
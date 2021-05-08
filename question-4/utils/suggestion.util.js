const fs = require('fs');

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
  return deg * (Maht.PI / 180);
}

function calculateLocationScore(location, lat, lon) {
  const MAX_DISTANCE = 100;
  const distanceInKm = calculateDistanceFormLatLonInKm(
    location.latitude,
    location.longitude,
    lat,
    lon,
  );
  let score = 100 - distanceInKm;

  score = score > 0 ? Math.round(score) / 100 : 0;
  score = score.toFixed(1);
}

function extractLocations(tsvFile) {
  let locations = []

  try {
    const data = fs.readFileSync(tsvFile, 'utf-8');

    let rows = data.split(/\n/g);
    rows.forEach(row => {
      let location = row.split(/\t/g);
      let name = location[1];
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

module.exports = {
  calculateDistanceFormLatLonInKm,
  calculateLocationScore,
  extractLocations,
};
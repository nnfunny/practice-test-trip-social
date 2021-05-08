const {
  extractLocations,
  calculateLocationScore,
  calculateLocationScore2,
  matchWithName,
  sortInDescendingOrder,
} = require("../utils/suggestion.util");
const path = require("path");

// const suggestions = {
//   suggestions: [
//     {
//       name: "London, ON, Canada",
//       latitude: "42.98339",
//       longitude: "-81.23304",
//       score: 0.9,
//     },
//     {
//       name: "London, OH, USA",
//       latitude: "39.88645",
//       longitude: "-83.44825",
//       score: 0.5,
//     },
//     {
//       name: "London, KY, USA",
//       latitude: "37.12898",
//       longitude: "-84.08326",
//       score: 0.5,
//     },
//     {
//       name: "Londontowne, MD, USA",
//       latitude: "38.93345",
//       longitude: "-76.54941",
//       score: 0.3,
//     },
//   ],
// };
/**
 * Get suggestions for large cities
 * @public
 */
exports.get = (req, res) => {
  const tsvFile = path.join(__dirname, "../data/cities_canada-usa.tsv");
  const locations = extractLocations(tsvFile);
  let suggestions = [];
  let { q, latitude, longitude } = req.query;

  latitude = latitude ? latitude : 0;
  longitude = longitude ? longitude : 0;

  locations.forEach((location) => {
    const score1 = calculateLocationScore(location, latitude, longitude);
    const score2 = calculateLocationScore2(location, latitude, longitude);
    let score = (score1 + score2) / 2;
    score = +score.toFixed(1);
    const name = location.name;

    if (score !== 0.0 && matchWithName(q, name)) {
      let suggestion = { ...location, score };
      suggestions.push(suggestion);
    }
  });

  suggestions.sort(sortInDescendingOrder);

  res.json({ suggestions });
};

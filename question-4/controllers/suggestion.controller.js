const { extractLocations } = require("../utils/suggestion.util");
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

  res.json(locations);
};

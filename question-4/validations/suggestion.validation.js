var constants = require("../utils/constants"),
  MAX_Q_QUERY_LENGTH = constants.MAX_Q_QUERY_LENGTH;

function validateQuery(q, latitude, longitude, locations) {
  if (!q && !latitude && !longitude) {
    return false;
  }

  if (latitude && isNaN(+latitude)) {
    return false;
  }

  if (longitude && isNaN(+longitude)) {
    return false;
  }

  return true;
}

module.exports = {
  validateQuery: validateQuery
};

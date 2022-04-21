const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',

  // Optional depending on the providers
  apiKey: 'x7Jvy0MyLKRGUTdyuJbjIWBFKbd6GphB', // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

module.exports = NodeGeocoder(options);

// Using callback

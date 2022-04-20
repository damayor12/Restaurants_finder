const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',

  // Optional depending on the providers
  fetch: customFetchImplementation,
  apiKey: process.env, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};


module.exports =  NodeGeocoder(options);

// Using callback

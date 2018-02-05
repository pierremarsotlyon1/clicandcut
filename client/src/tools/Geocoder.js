/**
 * Created by pierremarsot on 20/05/2017.
 */
const NodeGeocoder = require('node-geocoder');

const optionsGeocoder = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDBKmRgsVpedoY6-IO80AB5ioTv--D_5gk', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(optionsGeocoder);

export function gpsToAddress(lat, lon){
  return new Promise((resolve, reject) => {
    geocoder.reverse({lat: lat, lon: lon})
      .then(function (res) {
        if(!res || !res[0] || !res[0].formattedAddress){
          return reject();
        }
        return resolve(res[0].formattedAddress);
      })
      .catch(function () {
        return reject();
      });
  });
}
const fs = require('fs');
const inputjson = require('./data/cleanData.json');
const fetch = require('node-fetch');
const returnArray = inputjson.map(async (value) => {
  if (value.id > 15000 && value.id < 17000) {
    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.where}&key=AIzaSyC5_0aZRIIEf-B7_4fgtJqIb2CBpBRnp6A`);
    const resultJson = await result.json();
    if (resultJson.status === 'OK') {
      const results = resultJson.results;
      const viewport = results[0].geometry.viewport;
      const location = [viewport.northeast.lat, viewport.northeast.lng, viewport.southwest.lat, viewport.southwest.lng];
      return {
        id: value.id,
        location
      };
    }
  }
});

Promise.all(returnArray).then((res) => {
  fs.writeFileSync('outputData10.json', JSON.stringify(res));
});







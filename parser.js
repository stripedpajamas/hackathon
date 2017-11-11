const fs = require('fs');
const inputjson = require('./data/cleanData.json');
const fetch = require('node-fetch');
const returnArray = inputjson.map(async (value) => {
  if (value.id < 5000) {
    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.where}&key=AIzaSyBXIjg6-Mzg5XY1_nUNyyjjtA6zKGyu6H4`);
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
  fs.writeFileSync('outputData.json', JSON.stringify(res));
});







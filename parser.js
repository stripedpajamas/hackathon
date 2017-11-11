const fs = require('fs');
const inputjson = require('./cleanData.json');
const fetch = require('node-fetch');
const returnArray = inputjson.map(async (value) => {
  if (value.id < 10000 && value.id > 4999) {
    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.where}&key=AIzaSyBXIjg6-Mzg5XY1_nUNyyjjtA6zKGyu6H4`);
    const resultJson = await result.json();
    if (resultJson.status === 'OK') {
      const results = resultJson.results;
      const viewport = results[0].geometry.viewport;
      
      return {
        points: [],
        id: value.id,
        location: [viewport.northeast.lat, viewport.northeast.lng, viewport.southwest.lat, viewport.southwest.lng]
      };
    }
  }
});

Promise.all(returnArray).then((res) => {
  fs.writeFileSync('outputData.json', JSON.stringify(res));
});







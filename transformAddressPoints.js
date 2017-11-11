const fs = require('fs');
const input = require('./googleGeocodeData/outputData10.json');

const returnArray = input.map((val) => {
  if (val && val.id) {
    const points = val.location.map(value => {
      return ((value + 100) / 200);
    });
    return Object.assign({}, val, { points });
  }
});

fs.writeFileSync('./data/pointsData10.json', JSON.stringify(returnArray));
const fs = require('fs');
const input = require('./data/locationData.json');

const returnArray = input.map((val) => {
  if (val && val.id) {
    const points = val.location.map(value => {
      return ((value + 100) / 200);
    });
    return Object.assign({}, val, { points });
  }
});

fs.writeFileSync('pointsData.json', JSON.stringify(returnArray));
const fs = require('fs');
const points = require('./data/pointsData.json');
//"points":[0.676300262,0.09629666,0.6761761104999999,0.09621465550000004]

const output = [];

let counter = 0;

for (let i = .660; i < .690; i += 0.0001) {
  for (let j = .09; j < .1; j += 0.0001) {
    // check if these values are in the points data
    let found = false;
    for (let k = 0; k < points.length; k++) {
      // check if null since some of our data is null
      if (points[k]) {
        let currentpoints = points[k].points;
        let bigLat = currentpoints[0];
        let smallLat = currentpoints[2];
        let bigLong = currentpoints[1];
        let smallLong = currentpoints[3];

        if (i < bigLat && i > smallLat && j < bigLong && j > smallLong) {
          // console.log(i, j);
          // console.log(bigLat, smallLat, bigLong, smallLong);
          found = true;
        }
      }
    }
    console.log(found);
    if (!found) {
      const points = [i, j, i, j];
      output.push({ id: counter, points });
      counter++;
    }
  }
}

fs.writeFileSync('./data/noCrimeData.json', JSON.stringify(output));
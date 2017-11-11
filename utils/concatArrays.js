const one = require('./data/pointsData.json');
const one2 = require('./data/trash/pointsData2.json');
const one3 = require('./data/trash/pointsData3.json');
const one4 = require('./data/trash/pointsData4.json');
const one5 = require('./data/trash/pointsData5.json');
const one6 = require('./data/trash/pointsData6.json');
const one7 = require('./data/trash/pointsData7.json');
const one8 = require('./data/trash/pointsData8.json');
const one9 = require('./data/trash/pointsData9.json');
const one10 = require('./data/trash/pointsData10.json');
const fs = require('fs');

const result = one.concat(one2.concat(one3.concat(one4.concat(one5.concat(one6.concat(one7.concat(one8.concat(one9.concat(one10)))))))));

fs.writeFileSync('./data/pointsDataNew.json', JSON.stringify(result));
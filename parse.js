const fs = require('fs');
const data = require('./data/data');

// const allRaces = {
//
// };
//
// data.map((entry) => entry.Race).forEach((race) => {
//   allRaces[race] ? allRaces[race]++ : allRaces[race] = 1;
// });

const newData = data.map((entry, idx) => ({
  when: entry.Arrest_Datetime,
  where: entry.ArrestLocationst_NameCityStateZIP,
  id: idx,
  // weapon: entry.Weapon_Poss == 'Y' ? true : false
  }));

fs.writeFileSync('./data/cleanData.json', JSON.stringify(newData));

'00' + '01'.slice(-2);
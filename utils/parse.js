const fs = require('fs');
const data = require('./data/pointsDataNew.json');
const datetimedata = require('./data/datetimedata.json');

// const fixed = datetimedata.map((entry) => ({ ...entry, date: +entry.date, time: +entry.time }));

const mergedData = data.map((entry) => {
  const id = entry.id;
  return {
    ...entry,
    ...datetimedata[datetimedata.findIndex(x => x.id === id)]
  }
});

// const mergedData = noCrimeData.map((entry) => {
//   const timeH = ('00' + Math.floor(Math.random()*24)).slice(-2);
//   const timeM = ('00' + Math.floor(Math.random()*60)).slice(-2);
//   const timeS = '00';
//   const time = +`0.${timeH}${timeM}${timeS}`;
//   const dateM = ('00' + Math.floor(Math.random()*12)).slice(-2);
//   const dateD = ('00' + Math.floor(Math.random()*30)).slice(-2);
//   const dateY = '14';
//   const date = +`0.${dateM}${dateD}${dateY}`;
//
//   return {
//     ...entry,
//     date,
//     time
//   }
// });

// const newData = data.filter(x => !!x);


fs.writeFileSync('./data/mergedData.json', JSON.stringify(mergedData));
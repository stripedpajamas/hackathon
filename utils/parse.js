const fs = require('fs');
const data = require('../data/noCrimeDataMerged.json');
const md = require('../data/mergedData.json');

// const fixed = datetimedata.map((entry) => ({ ...entry, date: +entry.date, time: +entry.time }));

// merge a dataset with another
// const mergedData = md.map((entry) => {
//   const id = entry.id;
//   return {
//     ...entry,
//     ...data[data.findIndex(x => x.id === id)],
//   };
// });

// add an index to a dataset
// const nd = data.map((entry, idx) => ({ ...entry, id: idx }));

// change some data
// const newData = md.map((x) => ({ ...x, weapon: x.weapon ? 1 : 0 }));

// // split up time to separate data points
// const newData = md.map((x) => {
//   const date = x.date.slice(1);
//   const d = date.slice(0, 2);
//   const m = date.slice(2, 4);
//
//   const time = x.time.slice(1);
//   const h = time.slice(0, 2);
//   const mm = time.slice(2, 4);
//
//   return {
//     ...x,
//     day: d,
//     month: m,
//     hour: h,
//     minute: mm,
//   };
// });

// convert to floats
// const newData = md.map(x => ({
//   ...x,
//   day: +`0.${x.day}`,
//   month: +`0.${x.month}`,
//   hour: +`0.${x.hour}`,
//   minute: +`0.${x.minute}`,
// }));

// add random dates to a dataset
const newData = data.map((entry) => {
  const timeH = +`0.${('00' + (Math.floor(Math.random() * 23) + 1)).slice(-2)}`;
  const timeM = +`0.${('00' + (Math.floor(Math.random() * 59) + 1)).slice(-2)}`;
  const dateM = +`0.${('00' + (Math.floor(Math.random() * 11) + 1)).slice(-2)}`;
  const dateD = +`0.${('00' + (Math.floor(Math.random() * 29) + 1)).slice(-2)}`;
  const weapon = 0; // always no weapon if no crime

  return {
    ...entry,
    day: dateD,
    month: dateM,
    hour: timeH,
    minute: timeM,
    weapon,
  };
});

// const newData = data.filter(x => !!x);


fs.writeFileSync('../data/noCrimeDataMerged.json', JSON.stringify(newData));
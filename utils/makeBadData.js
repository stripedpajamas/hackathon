const goodData = require('./data/cleanData');

// idea is to change numbers slightly
// data is in form:
/*
[
  {
    date: float
    time: float
    location: [4]array
  }
]
 */

goodData.map((entry) => {
  let time = +entry.time.slice(2);
  if (time < 23) {
    // if the time is less than 11pm

  }
});
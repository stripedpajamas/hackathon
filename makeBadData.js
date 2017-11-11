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

goodData.map((entry) => ({ ...entry, time: +entry.time + 0.3}));
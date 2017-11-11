const synaptic = require('synaptic');
const data = require('./data/mergedData.json');
const badData = require('./data/noCrimeDataMerged.json');

const { Trainer, Architect } = synaptic;

const myPerceptron = new Architect.Perceptron(7, 8, 2);
const myTrainer = new Trainer(myPerceptron);

/*
input: [lat1, long1, lat1, long2, month, day, hour, minute, weapon] => [0 or 1 (crime), 0 or 1 (weapon)]
 */

const goodDataTraining = data.map((entry) => (
  {
    input: [
      entry.points[0],
      entry.points[1],
      // entry.points[2],
      // entry.points[3],
      entry.month,
      entry.day,
      entry.hour,
      entry.minute,
      entry.weapon,
    ],
    output: [1, entry.weapon],
  }
));

const badDataTraining = badData.map((entry) => (
  {
    input: [
      entry.points[0],
      entry.points[1],
      // entry.points[2],
      // entry.points[3],
      entry.month,
      entry.day,
      entry.hour,
      entry.minute,
      entry.weapon,
    ],
    output: [0, entry.weapon],
  }
));

const mergedTrainingData = goodDataTraining.concat(badDataTraining);

myTrainer.train(mergedTrainingData, {
  rate: 0.1,
  iterations: 20000,
  error: 0.005,
  shuffle: true,
  log: 1000,
  cost: Trainer.cost.CROSS_ENTROPY,
});

// yes crime, no weapon
console.log('yes crime, no weapon:', myPerceptron.activate([
  0.67673552,
  0.09653388200000002,
  0.01,
  0.02,
  0.09,
  0.15,
  0,
]));

// no crime, no weapon
console.log('no crime, no weapon:', myPerceptron.activate([
  0.66,
  0.091,
  0.05,
  0.03,
  0.21,
  0.39,
  0,
]));

module.exports = input => myPerceptron.activate(input);


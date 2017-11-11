const synaptic = require('synaptic');
const data = require('./data/mergedData.json');
const badData = require('./data/noCrimeDataMerged.json');

const { Neuron, Layer, Network, Trainer, Architect } = synaptic;

const myPerceptron = new Architect.Perceptron(6, 6, 6, 3, 1);
const myTrainer = new Trainer(myPerceptron);

/*
input: [lat1, long1, lat1, long2, time, date] => [0 or 1 (crime)]
 */

const goodDataTraining = data.map((entry) => {
  return {
    input: [
      +entry.points[0],
      +entry.points[1],
      +entry.points[2],
      +entry.points[3],
      +entry.date,
      +entry.time
    ],
    output: [1]
  }
});

const badDataTraining = badData.map((entry) => {
  return {
    input: [
      +entry.points[0],
      +entry.points[1],
      +entry.points[2],
      +entry.points[3],
      +entry.date,
      +entry.time
    ],
    output: [0]
  }
});

const mergedTrainingData = goodDataTraining.concat(badDataTraining);

myTrainer.train(mergedTrainingData, {
  rate: .1,
  iterations: 20000,
  error: 0.005,
  shuffle: true,
  cost: Trainer.cost.CROSS_ENTROPY
});

// 0.661,0.09,0.661,0.09,"where":"CLANTON RD  CHARLOTTE, NC 28217","date":".010114","time":".000800"}
console.log(myPerceptron.activate([
  0.661,
  0.09,
  0.661,
  0.09,
  0.072314,
  0.110800
]));

// "where":"RED ROOF DR  CHARLOTTE, NC 28217","date":".010114","time":".002400"}
console.log(myPerceptron.activate([
  0.6757354746514576,
  0.09552156040145754,
  0.6757219848485425,
  0.09550807059854251,
  0.010114,
  0.002400,
]));
module.exports = input => myPerceptron.activate(input);


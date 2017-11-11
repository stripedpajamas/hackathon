const synaptic = require('synaptic');
const data = require('./data/cleanData');

const { Neuron, Layer, Network, Trainer, Architect } = synaptic;

const myPerceptron = new Architect.Perceptron(4,3,1);
const myTrainer = new Trainer(myPerceptron);

/*
input: [locationLat, locationLong, time, date] => [0 or 1 (crime)]
 */

const trainingSet = data.map((entry) => {
  return {
    input: [entry.location[0], entry.location[1], entry.time, entry.date],
    output: [1]
  }
});

myTrainer.train(trainingSet, {
  iterations: 50000
});

console.log(myPerceptron.activate([0, 0, 0, 0, 0, 0, 1, 1])); // 3^2
console.log(myPerceptron.activate([0, 0, 0, 0, 0, 1, 1, 0])); // 6^2 0010 0100 = 36
// 00010101
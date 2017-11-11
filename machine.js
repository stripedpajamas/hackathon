const synaptic = require('synaptic');
const data = require('./data/mergedData.json');
const badData = require('./data/noCrimeDataMerged.json');

const { Trainer, Architect } = synaptic;

const myPerceptron = new Architect.Perceptron(6, 8, 1);
const myTrainer = new Trainer(myPerceptron);

/*
input: [lat1, long1, lat1, long2, month, day, hour, minute] => [0 or 1 (crime)]
 */

const train = (req, res) => {
  const goodDataTraining = data.map((entry) => (
    {
      input: [
        entry.points[0],
        entry.points[1],
        entry.month,
        entry.day,
        entry.hour,
        entry.minute,
      ],
      output: [1],
    }
  ));

  const badDataTraining = badData.map((entry) => (
    {
      input: [
        entry.points[0],
        entry.points[1],
        entry.month,
        entry.day,
        entry.hour,
        entry.minute,
      ],
      output: [0],
    }
  ));

  const mergedTrainingData = goodDataTraining.concat(badDataTraining);

  myTrainer.train(mergedTrainingData, {
    rate: 0.1,
    iterations: 10000,
    error: 0.005,
    shuffle: true,
    log: 1000,
    cost: Trainer.cost.CROSS_ENTROPY,
  });

  res.json({ success: true, training: 'done?' });
};

const run = input => myPerceptron.activate(input);

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

/* input should be
{
  input: [[lat, long, month, day, hour, minute], [lat, long, month, day, hour, minute]]
}
*/


module.exports = { train, run };


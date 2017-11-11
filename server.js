const express = require('express');
const body = require('body-parser');
const machine = require('./machine');

const app = express();
app.use(body.json());

app.get('/', express.static('./web/dist'));
app.post('/machine', (req, res) => {
  // make properly formatted input from req.body
  const input = req.body.input;
  let output = [];
  if (Array.isArray(req.body.input)) {
    output = input.map(values => {
      // input [0] is going to be lat before squash, so squash them
      values[0] = (values[0] + 100) / 200;
      values[1] = (values[1] + 100) / 200;
      return machine.run(values)
    });
  }
  res.end(JSON.stringify({ output }));
});
app.get('/train', machine.train);

app.listen(3000, () => console.log('app listening on port 3000!'));

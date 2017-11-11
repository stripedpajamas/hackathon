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
    output = input.map(x => machine(x));
  }
  res.end(output);
});

app.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'));

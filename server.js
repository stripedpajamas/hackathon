const express = require('express');
const machine = require('./machine');

const app = express();

app.get('/', express.static('./web/dist'));
app.get('/machine', (req, res) => {
  // make properly formatted input from req.body
  let input;
  res.end(machine(input));
});

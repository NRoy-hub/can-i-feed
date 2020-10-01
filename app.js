const express = require('express');
const app = express();

require('dotenv').config();
const PORT = 80;

app.get('/', (req, res) => res.send('hello world'));

app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});

const db = require('./db');
const waterfall = new db.waterfall();

waterfall.run([
  cb => {
    waterfall.client.query('SELECT NOW();', [], (err, result) => {
      if(err)cb(err);
      cb(null, result.rows)
    });
  },
  (_, cb) => {
    waterfall.client.query('SELECT NOW();', [], (err, result) => {
      if(err)cb(err);
      cb(null, result.rows)
    });
  },
  (firsts, cb) => {
    console.log(firsts);
    console.log('second');
    cb();
  }
]);

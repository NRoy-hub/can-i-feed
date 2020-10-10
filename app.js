const express = require('express');
const app = express();
const moment = require('moment');
const dotenv = require('dotenv');
const cors = require('cors');

const PORT = 80;

dotenv.config();

const router = require('./routes/router');

app.use(cors());

app.set('views', __dirname + '/client/build');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/client/build'));
app.use(express.json());

app.get('/*', (req, res, next) => {
  res.render('index.html');
});

app.use((req, res, next) => {
  console.log('PATH: ', req.path);
  console.log('TIME: ', moment().format());

  res.now = () => (moment().format());
  res.finish = (result, data) => res.send({ result, data });
  res.fail = (message) => res.send({ result: 'fail', message: message || 'Server Error!' });
  res.db = require('./db');
  res.db.prototype.fail = res.fail;
  next();
});

app.use('/', router);


app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});

// TODO: 분 차이 
// const before = moment('2020-10-10T00:24:06+09:00');
// const sub = moment() - before;
// console.log(moment(sub).minutes());
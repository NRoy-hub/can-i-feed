const express = require('express');
const app = express();
const moment = require('moment');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser('cif_salt'));

app.get('/*', (req, res, next) => {
  res.render('index.html');
});

app.use((req, res, next) => {
  console.log('PATH: ', req.path);
  console.log('TIME: ', moment().format());

  res.now = () => (moment().format());
  res.fromNow = (time) => {
    const sub = moment() - moment(time);
    return moment(sub).minutes();
  }
  res.finish = (result, data) => res.send({ result, data });
  res.db = require('./db');
  res.db.prototype.finish = res.finish;
  next();
});

app.use('/', router);


app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});
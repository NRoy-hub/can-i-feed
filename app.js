const express = require('express');
const app = express();
const moment = require('moment');
const dotenv = require('dotenv');
const cors = require('cors');


const PORT = 80;
const router = require('./routes/__router');

dotenv.config();
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

  req.now = () => (moment().format());
  res.finish = (result, data) => res.send({ result, data });
  res.error = () => res.status(505).send('Server Error!');
  next();
});

app.use('/', router);


app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});
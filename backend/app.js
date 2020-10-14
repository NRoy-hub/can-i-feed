const express = require('express');
const app = express();
const moment = require('moment');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const cors = require('cors');
dotenv.config();

const PORT = 80;

app.use(cors());

app.set('views', __dirname + '/../frontend/build');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/../frontend/build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SALT));


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

app.get('/*', (req, res, next) => {
  res.render('index.html');
});
app.use('/', require('./routes/router'));


app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});
const express = require('express');
const router = express.Router();
const moment = require('moment');

router.use((req, res, next) => {
  console.log('PATH: ', req.path);
  console.log('TIME: ', moment().format());

  req.now = () => (moment().format());

  res.ok = (data) => res.send({ result: 'ok', data });
  res.bad = () => res.send({ result: 'bad' });
  res.error = () => res.status(505).send('Server Error!');
  next();
});

// 라우팅 처리
router.post('/keywords', require('./keywords'));

router.post('/search/:keyword', require('./search'));


// 404 처리
router.use((req, res, next) => {
  res.status(404).send('Not Found');
})

// 에러 처리
router.use((err, req, res, next) => {
  console.error(err);
  res.status(505).send('Server Error!');
});


module.exports = router;
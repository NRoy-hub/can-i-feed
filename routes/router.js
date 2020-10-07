const express = require('express');
const router = express.Router();
const moment = require('moment');

router.use((req, res, next) => {
  console.log('PATH: ', req.path);
  console.log('TIME: ', moment().format());
  next();
});

// 라우팅 처리
router.post('/', (req, res, next) => {
  res.send('hello');
});

router.post('/test', (req, res, next) => {
  throw new Error('테스트 에러');
});


// 404 처리
router.use((req, res, next) => {
  res.status(404).send('Not Found');
})

// 에러 처리
router.use((err, req, res, next) => {
  console.error(err);
  res.status(505).send('Something broke!');
});


module.exports = router;
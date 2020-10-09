const express = require('express');

const router = express.Router();
const commonRouter = express.Router();
const userRouter = express.Router();
const postRouter = express.Router();

router.use('/', commonRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);

// 404 처리
router.use((req, res, next) => {
  res.status(404).send('Not Found');
})

// 에러 처리
router.use((err, req, res, next) => {
  console.error(err);
  res.status(505).send('Server Error!');
});

commonRouter.post('/keywords', require('./common/keywords'));
commonRouter.post('/search', require('./common/search'));




module.exports = router;
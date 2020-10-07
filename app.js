const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 80;
const router = require('./routes/router');

app.use(cors());

app.use('/', router);



app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});
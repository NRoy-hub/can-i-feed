module.exports = (req, res, next) => {
  const moment = require('moment');

  const { keyword } = req.params;
  if(!(!!keyword)){ return res.bad(); }
  
  const db = require('../db');
  const waterfall = new db.waterfall(res);
  waterfall.run([
    cb => {
      const query = 'SELECT * FROM keyword WHERE name = $1;';
      const values = [keyword];
      
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (row, cb) => {
      const query = row ? 
        'UPDATE keyword SET count = count + 1, update_time = $2 WHERE name = $1;':
          'INSERT INTO keyword(name, update_time, count) VALUES($1, $2, 1);';
      const values = [keyword, req.now()];

      waterfall.client.query(query, values, (err) => {
        if(err)return cb(err);
        cb();
      })
    },
    // TODO: Post 불러오기
  ]);
}
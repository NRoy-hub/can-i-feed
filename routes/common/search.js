module.exports = (req, res, next) => {
  const moment = require('moment');

  const { keyword, species } = req.body;
  if(!(!!keyword) || !species){ return res.finish('invalid'); }
  
  const db = require('../../db');
  const waterfall = new db.waterfall(res);
  waterfall.run([
    cb => {
      const query = 'SELECT * FROM keyword WHERE name=$1 AND species=$2;';
      const values = [keyword, species];
      
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (row, cb) => {
      const query = row ? 
        'UPDATE keyword SET count = count + 1, update_time = $3 WHERE name = $1 AND species=$2;':
          'INSERT INTO keyword(name, species, update_time, count) VALUES($1, $2, $3, 1);';
      const values = [keyword, species, req.now()];

      waterfall.client.query(query, values, (err) => {
        if(err)return cb(err);
        cb();
      })
    },
    cb => {
      const query = `SELECT id, photo, title, recommend_count, nonrecommend_count FROM post WHERE title LIKE $1;`;
      const values = [`${ keyword }%`];

      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        res.finish('ok', { posts: result.rows });
        cb();
      });
    }
  ]);
}
module.exports = (req, res, next) => {
  const db = require('../db');
  const waterfall = new db.waterfall(res);
  const length = 5;

  waterfall.run([
    cb => {
      const query = 'SELECT name FROM keyword ORDER BY update_time DESC;';
      waterfall.client.query(query, (err, result) => {
        if(err)return cb(err);
        const latest = result.rows.slice(0, length);
        cb(null, { latest });
      });
    },
    (keywords, cb) => {
      const query = 'SELECT name FROM keyword ORDER BY count DESC;';
      waterfall.client.query(query, (err, result) => {
        if(err)return cb(err);
        const most = result.rows.slice(0, length);
        cb(null, { ...keywords, most });
      });
    },
    (keywords, cb) => {
      const query = 'SELECT title FROM post ORDER BY recommend_count DESC;';
      waterfall.client.query(query, (err, result) => {
        if(err)return cb(err);
        const recommend = result.rows.slice(0, length);
        cb(null, { ...keywords, recommend });
      });
    },
    (keywords, cb) => {
      const query = 'SELECT title FROM post ORDER BY nonrecommend_count DESC;';
      waterfall.client.query(query, (err, result) => {
        if(err)return cb(err);
        const nonrecommend = result.rows.slice(0, length);
        cb(null, { ...keywords, nonrecommend });
      });
    },
    (keywords, cb) => {
      res.ok(keywords);
      cb();
    }
  ]);
}
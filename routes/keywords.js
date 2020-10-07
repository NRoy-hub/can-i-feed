module.exports = (req, res, next) => {
  const db = require('../db');
  const waterfall = new db.waterfall(res);
  const length = 5;

  const { species } = req.body;
  if(!species){ return res.finish('invalid'); }

  waterfall.run([
    cb => {
      const query = 'SELECT name FROM keyword WHERE species=$1 ORDER BY update_time DESC;';
      const values = [species];
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        const latest = result.rows.slice(0, length);
        cb(null, { latest });
      });
    },
    (keywords, cb) => {
      const query = 'SELECT name FROM keyword WHERE species=$1 ORDER BY count DESC;';
      const values = [species];
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        const most = result.rows.slice(0, length);
        cb(null, { ...keywords, most });
      });
    },
    (keywords, cb) => {
      const query = 'SELECT title FROM post WHERE species_id=$1 ORDER BY recommend_count DESC;';
      const values = [species];
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        const recommend = result.rows.slice(0, length);
        cb(null, { ...keywords, recommend });
      });
    },
    (keywords, cb) => {
      const query = 'SELECT title FROM post WHERE species_id=$1 ORDER BY nonrecommend_count DESC;';
      const values = [species];
      waterfall.client.query(query, values, (err, result) => {
        if(err)return cb(err);
        const nonrecommend = result.rows.slice(0, length);
        cb(null, { ...keywords, nonrecommend });
      });
    },
    (keywords, cb) => {
      res.finish('ok', keywords);
      cb();
    }
  ]);
}
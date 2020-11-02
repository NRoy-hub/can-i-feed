module.exports = (req, res) => {
  const db = new res.db();
  const length = 20;

  const { species } = req.body;
  if(!species){ return res.finish('invalid'); }

  db.run([
    cb => {
      const query = 'SELECT name FROM keyword WHERE species=$1 ORDER BY count DESC;';
      const values = [species];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const most = result.rows.slice(0, length).map(({ name }) => name);
        cb(null, { most });
      });
    },
    (keywords, cb) => {
      const query = `
        SELECT name FROM post 
        WHERE species_id=$1 AND recommend_count > 0 AND recommend_count >= nonrecommend_count 
        ORDER BY recommend_count DESC;
      `;
      const values = [species];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const recommend = result.rows.slice(0, length).map(({ name }) => name);
        cb(null, { ...keywords, recommend });
      });
    },
    (keywords, cb) => {
      const query = `
        SELECT name FROM post 
        WHERE species_id=$1 AND nonrecommend_count > 0 AND nonrecommend_count >= recommend_count
        ORDER BY nonrecommend_count DESC;
      `;
      const values = [species];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const nonrecommend = result.rows.slice(0, length).map(({ name }) => name);
        cb(null, { ...keywords, nonrecommend });
      });
    },
    (keywords, cb) => {
      res.finish('ok', keywords);
      cb();
    }
  ]);
}
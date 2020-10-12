module.exports = (req, res) => {

  const { species } = req.body;
  const keyword = req.body.keyword.trim();
  if(!(!!keyword) || !species){ return res.finish('invalid'); }
  
  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT * FROM keyword WHERE name=$1 AND species=$2;';
      const values = [keyword, species];
      
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (row, cb) => {
      const query = row ? 
        'UPDATE keyword SET count = count + 1, update_time = $3 WHERE name = $1 AND species=$2;':
          'INSERT INTO keyword(name, species, update_time, count) VALUES($1, $2, $3, 1);';
      const values = [keyword, species, res.now()];

      db.query(query, values, (err) => {
        if(err)return cb(err);
        cb();
      })
    },
    cb => {
      const query = `SELECT id, photo, name, recommend_count, nonrecommend_count FROM post WHERE name LIKE $1 ORDER BY name = $2 DESC;`;
      const values = [`${ keyword }%`, keyword];

      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const exist = result.rows[0] && result.rows[0].name === keyword;
        res.finish('ok', { posts: result.rows, exist });
        cb();
      });
    }
  ]);
}
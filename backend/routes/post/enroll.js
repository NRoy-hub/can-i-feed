module.exports = (req, res) => {
  const { species, name } = req.body;
  const file = req.file;
  if(!species || !file || !name){ return res.finish('invalid'); }

  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT * FROM post WHERE species_id = $1 AND name = $2;';
      const values = [species, name];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(result.rows.length > 0)return cb('conflict');
        cb();
      });
    },
    cb => {
      const query = `
        INSERT INTO post(user_id, species_id, photo, name, update_time)
        VALUES($1, $2, $3, $4, $5); 
      `;
      const values = [req.user.id, species, res.photoUrl, name, res.now()];
      db.query(query, values, (err) => {
        if(err)return cb(err);
        res.finish('ok');
        cb();
      });
    }
  ]);
}
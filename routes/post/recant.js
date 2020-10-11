module.exports = (req, res) => {
  const { post_id } = req.body;
  if(!post_id){ return res.finish('invalid'); }

  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT * FROM post WHERE id = $1;';
      const values = [post_id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(!result.rows[0])return cb('void');
        cb();
      })
    },
    cb => {
      const query = 'DELETE FROM comment WHERE post_id = $1 AND user_id = $2 RETURNING *;';
      const values = [post_id, req.user.id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(!result.rows[0])return cb('void');
        res.finish('ok')
        cb();
      });
    }
  ]);
}
module.exports = (req, res) => {

  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT email, photo_url FROM "user" WHERE id = $1;';
      const values = [req.user.id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const { email, photo_url } = result.rows[0];
        res.finish('ok', { user_id: req.user.id, email, photo_url });
        cb();
      });
    }
  ]);
}
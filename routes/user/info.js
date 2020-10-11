module.exports = (req, res) => {
  const userId = req.user.id;

  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT email FROM "user" WHERE id = $1;';
      const values = [userId];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const { email } = result.rows[0];
        res.finish('ok', { user_id: userId, email });
        cb();
      });
    }
  ]);
}
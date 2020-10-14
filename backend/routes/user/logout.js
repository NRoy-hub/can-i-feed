module.exports = (req, res) => {
  res.clearCookie('canifeed_uid');
  res.clearCookie('canifeed_sid');

  const db = new res.db();
  db.run([
    cb => {
      const query = 'DELETE FROM user_session WHERE user_id = $1;';
      const values = [req.user.id];
      db.query(query, values, err => {
        if(err)return cb(err);
        res.finish('ok');
        cb();
      });
    }
  ]);
}
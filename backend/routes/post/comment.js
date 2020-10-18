module.exports = (req, res) => {
  const { canifeed_uid: userId } = req.cookies;
  const { post_id } = req.body;
  if(!post_id){ return res.finish('invalid'); }

  const db = new res.db();
  db.run([
    cb => {
      if(!userId)return cb(null, null);

      const query = 'SELECT id, type, text FROM comment WHERE post_id = $1 AND user_id = $2;';
      const values = [post_id, userId];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0] || null);
      });
    },
    (myComment, cb) => {
      const query = `SELECT id, type, text FROM comment WHERE post_id = $1 AND text != ''${ userId ? ' AND user_id != $2' : '' };`;
      const values = [post_id];
      userId && values.push(userId);
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        res.finish('ok', { my_comment: myComment, comments: result.rows });
        cb(null, result.rows);
      });
    }
  ]);
}
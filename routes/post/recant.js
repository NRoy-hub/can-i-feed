module.exports = (req, res) => {
  const { post_id } = req.body;
  if(!post_id){ return res.finish('invalid'); }

  const db = new res.db();
  db.run([
    cb => {
      const query = 'DELETE FROM comment WHERE post_id = $1 AND user_id = $2 RETURNING type;';
      const values = [post_id, req.user.id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(!result.rows[0])return cb('conflict');
        cb(null, result.rows[0].type);
      });
    },
    (type, cb) => {
      const countName = type === 1 ? 'recommend_count' : 'nonrecommend_count';
      const query = `
        UPDATE post SET ${ countName } = ${ countName } - 1 
        WHERE id = $1
        RETURNING recommend_count, nonrecommend_count;
      `;
      const values = [post_id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(!result.rows[0])return cb('void');
        cb(null, result.rows[0])
      })
    },
    (pre, cb) => {
      const query = 'SELECT id, type, text FROM comment WHERE post_id = $1 AND text != $2;';
      const values = [post_id, ''];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const data = { ...pre, comments: result.rows };
        res.finish('ok', data);
        cb();
      });
    }
  ]);
}
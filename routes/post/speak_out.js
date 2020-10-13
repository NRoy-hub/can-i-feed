module.exports = (req, res) => {
  const { post_id, type } = req.body;
  const correctTypes = [1, 2];
  if(!post_id || type === undefined || !correctTypes.includes(type) || req.body.text === undefined){ 
    return res.finish('invalid'); 
  }
  const text = req.body.text.trim();

  const db = new res.db();
  db.run([
    cb => {
      const countName = type === 1 ? 'recommend_count' : 'nonrecommend_count';
      const query = `
        UPDATE post SET ${ countName } = ${ countName } + 1 
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
      const query = `
        INSERT INTO comment(post_id, user_id, type, text, update_time)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT(post_id, user_id) DO NOTHING
        RETURNING id, type, text;
      `;
      const values = [post_id, req.user.id, type, text, res.now()];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(!result.rows[0])return cb('conflict');
        cb(null, { ...pre, my_comment: result.rows[0] });
      });
    },
    (pre, cb) => {
      const query = 'SELECT id, type, text FROM comment WHERE post_id = $1 AND user_id != $2 AND text != $3;';
      const values = [post_id, req.user.id, ''];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const data = { ...pre, comments: result.rows };
        res.finish('ok', data);
        cb();
      });
    }
  ]);
}
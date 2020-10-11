module.exports = (req, res) => {
  const { post_id, type, text } = req.body;
  const correctTypes = [1, 2];
  if(!post_id || type === undefined || !correctTypes.includes(type) || text === undefined){ 
    return res.finish('invalid'); 
  }

  const db = new res.db();
  db.run([
    cb => {
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
        res.finish('ok', { my_comment: result.rows[0] });
        cb();
      });
    }
  ]);
}
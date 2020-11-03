module.exports = (req, res) => {
  const { page } = req.body;
  if(!page)return res.finish('invalid');

  const db = new res.db();
  db.run([
    cb => {
      const query = `
        SELECT c.id, c.type, c.text, p.name, c.update_time
        FROM comment c JOIN post p
        ON c.post_id = p.id
        WHERE c.user_id = $1
        ORDER BY c.update_time DESC;
      `;
      const values = [req.user.id];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const amount = 20;
        const end = result.rows.length < amount;
        const comments = result.rows.splice(amount * (page - 1), amount)
        res.finish('ok', { comments, end })
      });
    }
  ])
}
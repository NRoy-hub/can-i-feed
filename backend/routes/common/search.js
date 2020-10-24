const async = require('async');

module.exports = (req, res) => {
  const { canifeed_uid: userId } = req.cookies;
  const { species, page } = req.body;
  const keyword = req.body.keyword.trim();
  if(!(!!keyword) || !species || isNaN(page)){ return res.finish('invalid'); }
  
  const db = new res.db();
  db.run([
    (cb) => {
      const query = `
        INSERT INTO keyword(name, species, update_time)
        VALUES($1, $2, $3)
        ON CONFLICT(name, species) 
        DO UPDATE SET count = keyword.count + 1, update_time= $3;
      `;
      const values = [keyword, species, res.now()];
      db.query(query, values, (err) => {
        if(err)return cb(err);
        cb();
      })
    },
    (cb) => {
      const query = `SELECT id, photo, name, recommend_count, nonrecommend_count FROM post WHERE name LIKE $1 ORDER BY name = $2 DESC;`;
      const values = [`${ keyword }%`, keyword];

      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const exist = result.rows[0] && result.rows[0].name === keyword;
        const amount = 10;  // 한번에 보낼 포스트 개수
        const posts = result.rows.splice(amount * (page - 1), amount)
        cb(null, { posts, exist });
      });
    },
    (pre, cb) => {
      if(!userId)return cb(null, pre);

      async.map(pre.posts, (post, innerCb) => {
        const query = 'SELECT id, type, text FROM comment WHERE post_id = $1 AND user_id = $2;';
        const values = [post.id, userId];
        db.query(query, values, (err, result) => {
          if(err)return innerCb(err);
          innerCb(null, { ...post, my_comment: result.rows[0] });
        });
      },
      (err, result) => {
        if(err)return cb(err);
        cb(null, { ...pre, posts: result });
      });
    },
    (pre, cb) => {
      async.map(pre.posts, (post, innerCb) => {
        const query = `SELECT id, type, text FROM comment WHERE post_id = $1 AND text != ''${ userId ? ' AND user_id != $2' : '' };`;
        const values = [post.id];
        userId && values.push(userId);
        db.query(query, values, (err, result) => {
          if(err)return innerCb(err);
          innerCb(null, { ...post, comments: result.rows });
        });
      },
      (err, result) => {
        if(err)return cb(err);
        res.finish('ok', { ...pre, posts: result });
        cb();
      });
    }
  ]);
}
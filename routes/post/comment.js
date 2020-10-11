module.exports = (req, res) => {
  const { canifeed_uid: userId } = req.cookies;
  const { post_id } = req.body;

  const db = new res.db();
  db.run([
    cb => {
      const query = 'SELECT id, type, text, user_id FROM comment WHERE post_id = $1 ORDER BY user_id = $2;';
      const values = [post_id, userId];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows);
      });
    },
    (comments, cb) => {
      let copied = [...comments];
      let myComment;
      if(userId && comments[0] && comments[0].user_id === userId){
        myComment = { ...comments[0], user_id: undefined };
        copied = comments.slice(1).map(comment => ({ ...comment, user_id: undefined }));
      }
      res.finish('ok', { my_comment: myComment, comments: copied });
      cb();
      // TODO: TEST 해봐야함
    }
  ]);
}
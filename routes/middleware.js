const auth = (req, res, next) => {
  const { canifeed_uid } = req.cookies;
  const { canifeed_sid } = req.signedCookies;

  if(!canifeed_uid && !canifeed_sid){
    return res.finish('unauthorized');
  };

  const db = new res.db();
  db.run([
    cb => {
      const query = `
        SELECT us.session_id, us.update_time FROM "user" u 
        JOIN user_session us 
        ON u.id = us.user_id
        WHERE u.id = $1;
      `;
      const values = [canifeed_uid];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        if(result.rows.length === 0)return cb('unauthorized');
        cb(null, result.rows[0]);
      });
    },
    (user, cb) => {
      const { session_id, update_time } = user;
      if(canifeed_sid !== session_id || res.fromNow(update_time) > 60){
        return cb('unauthorized');
      }
      req.user = { id: canifeed_uid };
      cb();
      next();
    }
  ]);


}

module.exports = { auth };
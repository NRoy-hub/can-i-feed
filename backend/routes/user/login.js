module.exports = (req, res) => {
  const db = new res.db();

  const { keep } = req.body;
  const email = req.body.email.trim();
  const key = req.body.key.trim();
  if(!email || !key){ return res.finish('invalid') }

  db.run([
    cb => {
      const query = 'SELECT * FROM user_auth WHERE email = $1;';
      const values = [email];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (auth, cb) => {
      if(!auth || res.fromNow(auth.update_time) > 60 * 60000){ return cb('void'); }
      if(auth.key !== key){ return cb('wrong'); }
      cb();
    },
    cb => {
      const query = 'DELETE FROM user_auth WHERE email = $1;';
      const values = [email];
      db.query(query, values, (err) => {
        cb(err);
      });
    },
    cb => {
      const query = `
        INSERT INTO "user"(email) VALUES($1)
        ON CONFLICT(email) DO UPDATE SET email=EXCLUDED.email 
        RETURNING id, photo_url;
      `;
      const values = [email];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        cb(null, result.rows[0]);
      });
    },
    (user, cb) => {
      const query = `
        INSERT INTO user_session(user_id, update_time) 
        VALUES($1, $2)
        ON CONFLICT(user_id) 
        DO UPDATE SET session_id = gen_random_uuid(), update_time = $2
        RETURNING session_id;
      `;
      let updateTime = keep ? res.afterYear() : res.now();
      const values = [user.id, updateTime];
      db.query(query, values, (err, result) => {
        if(err)return cb(err);
        const { session_id } = result.rows[0];
        cb(null, { ...user, session_id });
      });
    },
    (user, cb) => {
      const { id: user_id, photo_url } = user;
      const expires = keep ? new Date(res.afterYear()) : null;
      res.cookie('canifeed_uid', user.id, { expires });
      res.cookie('canifeed_sid', user.session_id, { httpOnly: true, signed: true, expires });
      res.finish('ok', { user_id, photo_url, email });
      cb();
    }
  ])
}